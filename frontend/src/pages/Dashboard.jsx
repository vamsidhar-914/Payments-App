import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Context from "../context/AuthProvider";

export function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setbalance] = useState(0);
  const [loading, setloading] = useState(true);
  const { auth, setAuth } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => setbalance(response.data.balance));
    setloading(false);
  }, []);

  useEffect(() => {
    axios.get("/api/v1/user/bulk?filter=" + filter).then((response) => {
      setUsers(response.data.user);
    });
  }, [filter]);

  const handleDelete = () => {
    setAuth({});
    navigate("/signin");
  };

  return (
    <div>
      <Navbar />
      <div className='m-8'>
        <div className='flex justify-between'>
          <div className='font-bold text-lg'>
            Your Balance: rs {balance.toFixed()}
          </div>
          <button
            onClick={handleDelete}
            className='text-white p-3 rounded-lg bg-red-700 hover:opacity-95'
          >
            logout
          </button>
        </div>
        <div className='font-bold mt-6 text-lg'>Users</div>
        <div className='my-2'>
          <input
            type='text'
            placeholder='Search Users...'
            onChange={(e) => setFilter(e.target.value)}
            className='w-full px-2 py-1 border rounded border-slate-200 '
          />
        </div>
        <div>
          {users.map((user) => (
            <User
              user={user}
              key={user._id}
            />
          ))}
        </div>
      </div>
      {/* // */}
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
          <div className='flex flex-col justify-center h-full text-xl'>
            {user.firstName[0]}
          </div>
        </div>
        <div className='flex flex-col justify-center h-ful'>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center h-ful'>
        <div className='pt-4'>
          <button
            type='button'
            onClick={() =>
              navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }
            className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-sm px-5 py-2.5 me-2 mb-2'
          >
            send money
          </button>
        </div>
      </div>
    </div>
  );
}

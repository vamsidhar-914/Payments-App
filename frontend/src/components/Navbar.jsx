import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/AuthProvider";
import axios from "axios";
import { Modal } from "./Modal";

export function Navbar() {
  const [user, setuser] = useState({});
  const { auth } = useContext(Context);
  const [isOpen, setisOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:7000/api/v1/user/get/${auth.id}`
      );
      setuser(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='shadow h-14 flex justify-between'>
        <div className='flex flex-col justify-center h-full ml-4 text-green-700 font-semibold text-lg'>
          <Link to='/dashboard'>Payments App</Link>
        </div>
        <div className='flex'>
          <div className='flex flex-col justify-center h-full mr-4'>Hello</div>

          <div
            onClick={() => setisOpen(true)}
            className='rounded-full cursor-pointer h-12 w-full py-3 px-4 bg-slate-200 flex justify-center mt-1 mr-2'
          >
            <div className='flex flex-col justify-center h-full text-xl uppercase'>
              {user.firstName}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setisOpen(false)}
      >
        <div className='text-center w-56'>
          <div className='mx-auto my-4 w-48'>
            <h3 className='text-lg text-green-600 font-semibold pointer underline'>
              update your Profile
            </h3>
            <form className='pt-5'>
              <div>
                <div className='text-sm font-medium text-left py-2'>
                  FirstName
                </div>
                <input
                  type='text'
                  defaultValue={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className='w-full px-2 py-1 border border-slate-600 rounded focus:outline-blue-400'
                />
              </div>
              <div>
                <div className='text-sm font-medium text-left py-2'>
                  LastName
                </div>
                <input
                  type='text'
                  defaultValue={user.lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  className='w-full px-2 py-1 border border-slate-600 rounded focus:outline-blue-400'
                />
              </div>
              <div>
                <div className='text-sm font-medium text-left py-2'>Email</div>
                <input
                  type='email'
                  defaultValue={user.username}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-2 py-1 border border-slate-600 rounded focus:outline-blue-400'
                />
              </div>
              <div>
                <div className='text-sm font-medium text-left py-2'>
                  Password
                </div>
                <input
                  type='password'
                  placeholder='*******'
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  className='w-full px-2 py-1 border border-slate-600 rounded focus:outline-blue-400'
                />
              </div>
              <div className='pt-5'>
                <button
                  type='submit'
                  className='w-full text-black border border-green-500 hover:bg-slate-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-sm px-5 py-2.5 me-2 mb-2'
                >
                  Update
                </button>
              </div>
            </form>
            {/* <p className='text-sm text-gray-500'>
              Head back to{" "}
              <Link
                to='/dashboard'
                className='pointer underline cursor-pointer'
              >
                Dashboard
              </Link>
            </p> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

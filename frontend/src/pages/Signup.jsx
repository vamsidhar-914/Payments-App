import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/signup",
        {
          username: email,
          firstName,
          lastName,
          password,
        }
      );
      // if (response.success === false) {
      //   setloading(false);
      //   setError("invalid inputs");
      // }
      setloading(false);
      navigate("/signin");
    } catch (err) {
      setError(err.message);
      setloading(false);
    }
  };
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <div className='font-bold text-4xl pt-6'>Sign Up</div>
          <div className='text-slate-500 text-md pt-2 px-4  pb-4'>
            Enter Your information to create an account
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='text-sm font-medium text-left py-2'>
                FirstName
              </div>
              <input
                type='text'
                placeholder='john'
                onChange={(e) => setFirstName(e.target.value)}
                required
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div>
              <div className='text-sm font-medium text-left py-2'>LastName</div>
              <input
                type='text'
                placeholder='Doe'
                required
                onChange={(e) => setLastName(e.target.value)}
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div>
              <div className='text-sm font-medium text-left py-2'>Email</div>
              <input
                type='email'
                placeholder='john@gmail.com'
                required
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div>
              <div className='text-sm font-medium text-left py-2'>Password</div>
              <input
                type='password'
                placeholder='123456'
                required
                onChange={(e) => setpassword(e.target.value)}
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div className='pt-4'>
              <button
                type='submit'
                className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-sm px-5 py-2.5 me-2 mb-2'
              >
                SignUp
              </button>
            </div>
          </form>
          <div className='py-2 text-sm flex justify-center'>
            <p>
              already have an account?{" "}
              <Link
                className='pointer underline cursor-pointer'
                to='/signin'
              >
                signin
              </Link>
            </p>
          </div>
          <div className='py-2 text-sm text-red-700 flex justify-center'>
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

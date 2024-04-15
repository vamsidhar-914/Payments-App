import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/signin",
        {
          username: email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <div className='font-bold text-4xl pt-6'>Sign In</div>
          <div className='text-slate-500 text-md pt-2 px-4  pb-4'>
            Enter Your information to Login
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='text-sm font-medium text-left py-2'>Email</div>
              <input
                type='email'
                placeholder='john@gmail.com'
                onChange={(e) => setemail(e.target.value)}
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div>
              <div className='text-sm font-medium text-left py-2'>Password</div>
              <input
                type='password'
                placeholder='123456'
                onChange={(e) => setpassword(e.target.value)}
                className='w-full px-2 py-1 border border-slate-200 rounded focus:outline-blue-400'
              />
            </div>
            <div className='pt-4'>
              <button
                type='submit'
                className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-sm px-5 py-2.5 me-2 mb-2'
              >
                SignIn
              </button>
            </div>
          </form>
          <div className='py-2 text-sm flex justify-center'>
            <p>
              doesn;t have an account?{" "}
              <Link
                className='pointer underline cursor-pointer'
                to='/signup'
              >
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

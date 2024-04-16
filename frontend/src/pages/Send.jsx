import { useContext, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArrowBigLeft } from "lucide";
import { Navbar } from "../components/Navbar";
import Context from "../context/AuthProvider";
import { Modal } from "../components/Modal";
import { TiTick } from "react-icons/ti";

export function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const { auth } = useContext(Context);
  const [isOpen, setisOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("token"));

  const handleClick = () => {
    axios.post(
      "/api/v1/account/transfer",
      {
        to: id,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    // do something after transfer successfull
    setisOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center h-screen bg-gray-100'>
        <div className='h-full flex flex-col justify-center'>
          <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
            <div className='flex justify-center items-center space-y-1.5 p-6'>
              <h2 className='text-3xl font-semibold text-center'>Send money</h2>
            </div>
            <div className='p-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                  <span className='text-2xl text-white'>
                    {name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className='text-2xl font-semibold '>{name}</h3>
              </div>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    htmlFor='amount'
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    type='number'
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                    id='amount'
                    placeholder='Enter amount'
                  />
                </div>
                <button
                  type='button'
                  onClick={handleClick}
                  className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white'
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setisOpen(false)}
      >
        <div className='text-center w-56'>
          <TiTick
            size={56}
            className='mx-auto text-green-500'
          />
          <div className='mx-auto my-4 w-48'>
            <h3 className='text-lg font-black text-gray-800'>
              payment transfer successfull
            </h3>
            <p className='text-sm text-gray-500'>
              Head back to{" "}
              <Link
                to='/dashboard'
                className='pointer underline cursor-pointer'
              >
                Dashboard
              </Link>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

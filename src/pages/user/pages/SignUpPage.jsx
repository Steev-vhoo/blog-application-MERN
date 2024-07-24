import React, { useState } from 'react'
import Logo from '../../../components/Logo';
import { ArrowLeft } from 'lucide-react';
import Button from '../../../components/Button';
import { FcGoogle } from 'react-icons/fc';
import Divider from '../components/Divider';
import Inputbox from '../components/Inputbox';


const SignUpPage = () => {
  const user = {}
  const [showForm, setShowform] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const handleChange = (e) => {
    const [name, value] = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const googleLogin = async () => { };

  const handleSubmit = async () => { };

  if (user.token) window.location.replace("/");

  return (
    <div className='flex w-full h-screen '>
      <div className='hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center'>
        {fileURL && (
          <img src={fileURL || file}
            alt=""
            className='w-16 h-16 rounded-full' />
        )

        }
        <Logo type="signin" />
        <span className='text-xl font-semibold text-white'></span>
      </div>


      <div className='flex w-full md:w-2/3 h-full bg-white items-center px-4 md:px-20 lg:px-40'>
        <div className='w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8'>
          <div className='block mb-10 md:hidden -ml-8 '>
            <Logo />
          </div>
          <div className='w-full space-y-6 flex flex-col justify-start '>
            <div className='w-full flex gap-3 md:gap-4 items-center justify-center mb-12'>
              {showForm && (
                <ArrowLeft
                  className='text-2xl lg:text-3xl cursor-pointer text-gray-800 '
                  onClick={() => setShowform(false)} />
              )}
              <h2 className='text-2xl lg:text-3xl font-extrabold text-gray-900'> Sign up for an account</h2>
            </div>

            {showForm ? (
              <form className='max-w-md w-full space-y-6 mt-8 '
                onSubmit={handleSubmit}>

                <div className='flex flex-col rounded-md shadow-sm space-y-px gap-6 mb-8'>
                  <div className='w-full flex gap-4 '>
                  <Inputbox
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={data.firstName}
                  isRequired={true}
                  onChange={handleChange}
                />
                <Inputbox
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
                  isRequired={true}
                  onChange={handleChange} />
                  </div>
                </div>

              </form>
            ) : (
              <div className='max-w-md w-full space-y-8'>
                <Button
                  label="Sign up with Google"
                  icon={<FcGoogle className='text-xl' />}
                  styles="w-full flex flew-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
                  onClick={() => { googleLogin() }} />

                <Divider label="OR" />

                <Button
                  label="Continue with email"
                  styles="w-full gap-4 bg-white text-black px-5 py-2.5 rounded-full border border-gray-300"
                  onClick={setShowform(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
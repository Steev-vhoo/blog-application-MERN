import React, { useState } from 'react'
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import { FcGoogle } from 'react-icons/fc';
import Divider from '../components/Divider';
import Inputbox from '../components/Inputbox';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const user = {};
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const [name, value] = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  if (user.token) window.location.replace("/");


  return (
    <div className=' flex w-full h-screen'>
      <div className='hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center '>
        <Logo type="login" />
        <span className='text-xl font-semibold text-white'>Welcome, back</span>
      </div>

      <div className='flex w-full md:w-2/3 h-full bg-white items-center px-10 md:px-20 lg:px-40'>
        <div className='w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
          <div className='block mb-10 md:hidden'>
            <Logo />
          </div>
          <div className='max-w-md w-full  space-y-8'>
            <div>
              <h2 className='mt-6 text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white'> Sign in to your account</h2>
            </div>
            <Button
              label="Sign in with Google"
              icon={<FcGoogle className='' />}
              styles="w-full flex flew-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
              onClick={() => { }} />
            <Divider
              label="or sign in with email " />

            <form className='mt-8 space-y-6 '>
              <div className='flex flex-col shadow-sm space-y-px rounded-md gap-5'>
                <Inputbox
                  name="email"
                  type="texts"
                  label="Email address"
                  placeholder="you@example.com"
                  value={data?.email}
                  isRequired={true}
                  onChange={handleChange}
                />
                <Inputbox
                  name="password"
                  type="text"
                  label="Email address"
                  placeholder="Password"
                  value={data?.email}
                  isRequired={true}
                  onChange={handleChange} />

              </div>
              <Button
              label="Sign In"
              type="submit"
              styles='group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8  '/>
            </form>
            <div className='flex items-center justify-center text-gray-600'>
              <p>Don't have an account?{" "}</p>
              <Link to="signup" className='text-rose-800 font-medium'>Sign Up</Link>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default LoginPage
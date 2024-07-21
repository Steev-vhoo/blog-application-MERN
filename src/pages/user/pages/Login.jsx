import React from 'react'
import Logo from '../../../components/Logo';

const LoginPage = () => {
    const user = {};

if (user.token) window.location.replace("/");


  return (
    <div className='w-full h-screen'>
        <div className='hidden md:flex flex-col gap-y-4 w-1/4 min-h-screen bg-black items-center justify-between '>
        <Logo type="login"/>
        <span className='text-xl font-semibold text-white'>Welcome, back</span>
        </div>

        <div className='flex w-full md:w-2/3 h-full '>

        </div>
        
    </div>
  )
}

export default LoginPage
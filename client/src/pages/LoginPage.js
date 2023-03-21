import React from 'react'

const LoginPage = () => {
  return (
    <form action="" className='text-black flex flex-col justify-center items-center mt-40'>
    <input type="text" placeholder="username" className='border border-black rounded-lg my-2 px-4 py-2'/>
    <input type="password" placeholder="password" className='border border-black rounded-lg my-2 px-4 py-2'/>
    <button className='bg-black text-white px-4 py-2 rounded-md'>Login</button>
    </form> 
  )
}

export default LoginPage
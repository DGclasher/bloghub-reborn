import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-zinc-900 w-screen h-16 text-white flex text-lg justify-between items-center px-4 sticky top-0  mb-8'>
        <a href="/" className='w-1/2 cursor-pointer font-bold text-center text-2xl'>MyBlog</a>
        <div className='w-1/2 flex justify-center items-center'>
            <Link to="/login" className='mx-2 md:mx-16 cursor-pointer'>Login</Link>
            <Link to="/register" className='mx-2 md:mx-16 cursor-pointer'>Register</Link>
        </div>
    </div>

  )
}

export default Header
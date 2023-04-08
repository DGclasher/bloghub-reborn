import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout =() => {
    dispatch({type: "LOGOUT"})
    window.location.replace("/")
  }
  let [open,setOpen]=useState(false);
  return (
    
    <div className='shadow-md  w-full fixed top-0 left-0 z-10'>
      <div className='md:flex items-center justify-between bg-zinc-900 text-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center 
      '>
        <Link to="/" className="hover:text-lime-600 duration-500">Bloghub Reborn</Link>
        
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        
          <li className='md:ml-8 text-xl md:my-0 my-7'>
              <Link to="/" className='text-white hover:text-lime-600 duration-500'>Home</Link>
          </li>
          {user && (
            <>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to="/write" className='text-white hover:text-lime-600 duration-500'>Write</Link>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link onClick={handleLogout} className='text-white hover:text-lime-600 duration-500'>Logout</Link>
          </li>
            </>
          
          )}
          {!user && (
            <>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to="/Login" className='text-white hover:text-lime-600 duration-500'>Login</Link>
          </li>
          <li className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to="/register" className='text-white hover:text-lime-600 duration-500'>Register</Link>
          </li>
            </>
          )}
        
      </ul>
      </div>
    </div>
        
  );
}

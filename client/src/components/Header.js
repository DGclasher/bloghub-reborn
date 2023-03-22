import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
  }

  return (
    <div className="bg-zinc-900 w-screen h-16 text-white flex text-lg justify-between items-center px-4 sticky top-0  mb-8">
      <a
        href="/"
        className="w-1/2 cursor-pointer font-bold text-center text-2xl"
      >
        BlogHub Reborn
      </a>
      <div className="w-1/2 flex justify-center items-center">
        {username && (
          <>
            <Link to="/create" className="mx-2 md:mx-16 cursor-pointer">
              Create
            </Link>
            <Link to="/logout" className="mx-2 md:mx-16 cursor-pointer">
              Logout
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="mx-2 md:mx-16 cursor-pointer">
              Login
            </Link>
            <Link to="/register" className="mx-2 md:mx-16 cursor-pointer">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

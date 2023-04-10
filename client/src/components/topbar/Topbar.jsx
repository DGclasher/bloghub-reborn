import React, { useContext, useState } from "react";
import {  Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "../../context/Context";

function Topbar() {
  const [click, setClick] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };
  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar bg-zinc-900 text-white">
        <div className="nav-container">
          <Link exact to="/" className="nav-logo text-2xl md:text-3xl hover:text-lime-700">
            Bloghub Reborn
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link
                    exact
                    to="/write"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Write
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    exact
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => {
                      handleClick();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
            <li className="nav-item">
              <Link
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/register"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Register
              </Link>
            </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Topbar;

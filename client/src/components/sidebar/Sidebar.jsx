import { Link } from "react-router-dom";
import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCat] = useState([])

  useEffect(() => {
    const fetchCatgs = async() => {
    const res = await axios.get(`/categories`)
    setCat(res.data)
  }
  fetchCatgs()
})
  return (
    <div className="sidebar text-white bg-zinc-800 hidden md:flex relative">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://as2.ftcdn.net/v2/jpg/00/97/00/09/1000_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
          alt=""
          className="invert rounded-2xl"
          />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle text-white">CATEGORIES</span>
        <ul className="sidebarList">
            {cats.map(cat=>(
              
              <li className="sidebarListItem">
            <Link className="link" to={`/posts?cat=${cat.name}`}>
              {cat.name}
            </Link>
          </li>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle text-white">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
 
  );
}

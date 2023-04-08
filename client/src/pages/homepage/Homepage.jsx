import { useLocation } from "react-router";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./homepage.css";
import axios from 'axios'
const BASE_URL="https://bloghub-reborn.onrender.com/api"

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()

  useEffect(() => {
    const fetchPost = async ()=> {
        const response = await axios.get(BASE_URL+"/posts"+search)
        setPosts(response.data)
    }
    fetchPost()
  },[])

  return (
    <>
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}

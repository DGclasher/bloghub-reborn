import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./homepage.css";
import axios from 'axios'

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()

  useEffect(() => {
    const fetchPost = async ()=> {
        const response = await axios.get("/posts"+search)
        setPosts(response.data)
    }
    fetchPost()
  },[])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}

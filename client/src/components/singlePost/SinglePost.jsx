import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL="https://bloghub-reborn.onrender.com/api"

export default function SinglePost() {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [post, setPost] = useState([])

  useEffect(async ()=>{
    const response = await axios.get(`${BASE_URL}/posts/${id}`)
    setPost(response.data)
  },[])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (  
        <img
          className="singlePostImg"
          src={post.photo}
          alt=""
        />
        )}
        <img
          className="singlePostImg"
          src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
              <Link className="link" to={`/posts?user=${post.username}`}>
            <b className="singlePostAuthor">
                {post.username}
            </b>
              </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.description}
          <br />
  
         
        </p>
      </div>
    </div>
  );
}

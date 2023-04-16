import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SinglePost() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);

  const PF = "https://bloghub-reborn.vercel.app/images/";
  useEffect(async () => {
    const response = await axios.get(`/posts/${id}`);
    console.log(response.data);
    setPost(response.data);
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    let fileName = "";
    try {
      const res = await axios.get(`/posts/${id}`);
      if (res.data.photo) {
        fileName = res.data.photo;
      }
    } catch (error) {}
    console.log(fileName);
    try {
      if (fileName) {
        await axios.delete("/posts/" + id + "/" + fileName);
      } else {
        await axios.delete("/posts/" + id);
      }
      window.location.replace("/");
    } catch (error) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {!post.photo && (
          <img
            className="singlePostImg invert"
            src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            alt=""
          />
        )}
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <button onClick={handleDelete}>
              <i className="singlePostIcon far fa-trash-alt"></i>
            </button>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <Link className="link" to={`/posts?user=${post.username}`}>
              <b className="singlePostAuthor">{post.username}</b>
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

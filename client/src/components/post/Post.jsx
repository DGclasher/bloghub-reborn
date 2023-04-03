import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  return (
    <div className="post">
      {post.photo && (
      <img
        className="postImg"
        src={post.photo}
        alt=""
      />
      )}

        <img
        className="postImg"
        src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
        alt=""
      />

      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            {post.categories.map(c=>(

            <Link className="link" to={`/posts?cat=${c.name}`}>
              {c.name}
            </Link>
            ))}
          </span>
        </div>
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">
              {post.title}
            </span>
          </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.description}
      </p>
    </div>
  );
}

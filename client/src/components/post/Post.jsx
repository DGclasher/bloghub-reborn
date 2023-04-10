import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const printLimit = (content) => {
    let ans = "";
    for (let i = 0; i < 100 && i < content.length; i++) {
      ans += content[i];
    }
    ans += "...";
    return ans;
  };
  return (
    <div className="post bg-zinc-900 rounded-xl p-5">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      {!post.photo && (
        <img
          className="postImg invert h-[200px] md:h-[300px] object-fill"
          src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
          alt=""
        />
      )}

      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            {post.categories.map((c) => (
              <Link className="link" to={`/posts?cat=${c.name}`}>
                {c.name}
              </Link>
            ))}
          </span>
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{printLimit(post.description)}</p>
    </div>
  );
}

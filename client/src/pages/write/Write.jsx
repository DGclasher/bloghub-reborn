import { useState } from "react";
import "./write.css";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  let fileName = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      try {
        const res = await axios.post("/upload", data);
        fileName = res.data.fileName;
      } catch (error) {
        setError(true);
      }
    }
    try {
      const res = await axios.post("/posts", {
        title,
        description,
        photo: fileName,
      });
      const id = res.data.details._id;
      window.location.replace(`/post/${id}`);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="pt-10 item-center justify-center w-screen write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          className="w-[60vw] h-[100px] object-cover ml-[80px] p-1 bg-zinc-900 rounded-xl md:ml-[279px] mb-3 mt-3 md:h-[250px] md:w-[70vw]"
        />
      )}
      <form className="items-center justify-center" onSubmit={handleSubmit}>
        <div className="items-center flex flex-col gap-y-3 w-screen">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <div className="flex">
            <input
              id="fileInput"
              className="float-left"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="float-right">Add Image</p>
          </div>
          <input
            className="text-3xl md:w-[70vw] p-5 border-[none] bg-zinc-900 rounded"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-y-3 flex-col pt-2">
          <textarea
            className="md:text-3xl md:w-[70vw] p-5 border-[none] text-xl bg-zinc-900 h-[400px] md:h-[500px] w-[380px]"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="left-0 bg-lime-500 p-2 rounded-lg hover:bg-lime-800 text-black"
            type="submit"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Wrong Credentials");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  });

  return (
    <form
      action=""
      onSubmit={login}
      className="text-black flex flex-col justify-center items-center mt-40"
    >
      <input
        type="text"
        placeholder="username"
        className="border border-black rounded-lg my-2 px-4 py-2"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="border border-black rounded-lg my-2 px-4 py-2"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="bg-black text-white px-4 py-2 rounded-md">
        Login
      </button>
    </form>
  );
};

export default LoginPage;

import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev){
    ev.preventDefault();
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })
  }
  
  return (
    <form
      action=""
      onSubmit={register}
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
        Register
      </button>
    </form>
  );
};

export default RegisterPage;

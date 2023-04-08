import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import "./register.css"
import axios from "axios"

export default function Register() {
  const [username, setUsernmae] = useState([])
  const [password, setPassword] = useState([])
  const [email, setEmail] = useState([])
  const [error, setError] = useState(false)

  const handleSubmit =async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const res = await axios.post("/auth/register", { 
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
    
  }
    return (
      <div className="items-center justify-center flex pt-8 text-white">

    <div className="items-center flex flex-col justify-center bg-zinc-900 w-[350px] md:w-[500px] h-[500px] rounded-xl">
      <span className="text-4xl pb-4">Register</span>
      <form className="gap-y-3 flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="text-lg">Username</label>
        <input className="p-3 rounded-lg text-white bg-zinc-700" type="text" placeholder="Enter your username..." onClick={e=>setUsernmae(e.target.value)} />
        <label className="text-lg">Email</label>
        <input className="p-3 rounded-lg text-white bg-zinc-700" type="email" placeholder="Enter your email..." onClick={e=>setEmail(e.target.value)}/>
        <label className="text-lg">Password</label>
        <input className="p-3 rounded-lg text-white bg-zinc-700" type="password" placeholder="Enter your password..." onClick={e=>setPassword(e.target.value)}/>
        <button className="p-2 mt-3 rounded-lg bg-lime-600 hover:bg-lime-800 text-black cursor-pointer" type="submit">Register</button>
      </form>
      {error && (
        <span style={{color: "red", marginTop: "10px"}}>Wrong credentials!</span>
        )}
    </div>
      </div>
    )
}

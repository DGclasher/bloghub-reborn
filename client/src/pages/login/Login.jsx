import { useContext, useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Login() {
  const [error, setError] = useState(false)

  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching, user} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      window.location.replace("/")
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"})
      setError(true)
    }    
  }
  console.log(user)
  return (
    <div className="items-center justify-center flex pt-8 text-white">

    <div className="items-center flex flex-col justify-center bg-zinc-900 w-[350px] md:w-[500px] h-[450px] rounded-xl">
      <span className="text-4xl pb-3">Login</span>
      <form className="gap-y-3 flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="text-lg">Username</label>
        <input className="p-3 rounded-lg text-white bg-zinc-700" type="text" placeholder="Enter your username..." ref={userRef} />
        <label className="text-lg">Password</label>
        <input className="p-3 rounded-lg text-white bg-zinc-700" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="p-2 mt-3 rounded-lg bg-lime-600 hover:bg-lime-800 text-black cursor-pointer" type="submit" disabled={isFetching}>Login</button>
      </form>
      {error && (
        <span style={{color: "red", marginTop: "10px"}}>Wrong credentials!</span>
        )}
    </div>
      </div>
  );
}

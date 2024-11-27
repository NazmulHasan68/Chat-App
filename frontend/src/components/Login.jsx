import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [user , setuser] = useState({
    username:"",
    password: "",
  })

  const onsumithandler = async(e) =>{
    e.preventDefault()
    console.log(user);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message); 
        navigate('/'); 
      }
      setuser({
        email:"",
        password: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full shadow-md w-full bg-slate-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-70 border border-gray-100 p-10">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Sign up
        </h1>
        <form action="" onSubmit={onsumithandler}>
          <div>
            <label className="lable p-2">
              <span className="text-slate-700 font-medium label-text">
                Email Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Username "
              required
              value={user.username}
              onChange={(e)=>setuser({...user, username:e.target.value})}
              className="w-full input-bordered h-10 p-2 bg-red-50 text-slate-500 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="lable p-2">
              <span className="text-slate-700 font-medium label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
                required
              value={user.password}
              onChange={(e)=>setuser({...user, password:e.target.value})}
              className="w-full input-bordered h-10 p-2 bg-red-50 text-slate-500 outline-none rounded-lg"
            />
          </div>

          <button type="submit" className=" btn btn-block bg-sky-600 hover:bg-sky-700 outline-none border-none mt-4">
            Login
          </button>
          <div className="text-slate-800 mt-2">
            Do not have an account?{" "}
            <Link to={"/register"} className="text-sky-800">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'

export default function Signup() {
  const navigate = useNavigate()
  const [user, setuser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheckbox = (gender) => {
    setuser({ ...user, gender });
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
    setuser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full shadow-md w-full bg-slate-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-70 border border-gray-100 p-10">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Sign up
        </h1>
        <form action="" onSubmit={onsubmitHandler}>
          <div>
            <label className="lable p-2">
              <span className="text-slate-700 font-medium label-text">
                Full Name
              </span>
            </label>
            <input
              type="text"
              value={user.fullname}
              onChange={(e) => setuser({ ...user, fullname: e.target.value })}
              placeholder="Full name"
              className="w-full input-bordered h-10 p-2 bg-red-50 text-slate-500 outline-none rounded-lg"
            />
          </div>
          <div>
            <label className="lable p-2">
              <span className="text-slate-700 font-medium label-text">
                username
              </span>
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
              placeholder="Full name"
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
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              placeholder="password"
              className="w-full input-bordered h-10 p-2 bg-red-50 text-slate-500 outline-none rounded-lg"
            />
          </div>

          <div>
            <label className="lable p-2">
              <span className="text-slate-700 font-medium label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              value={user.confirmPassword}
              onChange={(e) =>
                setuser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input-bordered h-10 p-2 bg-red-50 text-slate-500 outline-none rounded-lg"
            />
          </div>

          <div className="flex gap-2 my-4 items-center text-slate-700">
            <div className="flex items-center ">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox bg-sky-200 mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox bg-sky-200 mx-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className=" btn btn-block bg-sky-600 hover:bg-sky-700 outline-none border-none"
          >
            Sinup
          </button>
          <div className="text-slate-800 mt-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-sky-800">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

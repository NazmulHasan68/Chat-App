import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

export default function Sidebar() {
  const navigate = useNavigate()
  const [search ,setsearch] = useState('')
  const {otherUsers} = useSelector(store=>store.user)
  const dispatch = useDispatch()

  const loguthandler =async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`)
      toast.success(res.data.message)
      navigate('/login')
    } catch (error) {
      toast.error(error.res.data.message)
      console.log(error); 
    }
  }

  const searchSubmithandler = (e) =>{
    e.preventDefault()
    const conversationUser = otherUsers?.find((user)=> user.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }else{
      toast.error("User not found")
    }
    setsearch('')
  }

  return (
    <div className="p-2 flex flex-col">
      <form action="" onSubmit={searchSubmithandler} className="flex items-center gap-2">
        <input
          type=" text"
          value={search}
          onChange={(e)=>setsearch(e.target.value)}
          className="input input-bordered rounded-md text-slate-700 bg-white"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-300 border-none hover:bg-slate-500">
          <IoIosSearch size={22} className="text-slate-50" />
        </button>
      </form>
      <div className="divider divider-primary"></div>
      <OtherUsers />
      <div className="">
        <button onClick={loguthandler} className="btn btn-sm bg-slate-200 text-slate-700 border-none hover:bg-slate-300">
          Logout
        </button>
      </div>
    </div>
  );
}

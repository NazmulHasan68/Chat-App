import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlic";

export default function SendInput() {
 
  const [message , setmessage] = useState("")
  const dispath = useDispatch()
  const {selectedUser} = useSelector(store=>store.user)

  const onSubmithandler = async(e) =>{
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,
        {message}, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );
      dispath(setMessage([...message, res?.data?.newMessage]))
      setmessage('')
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={onSubmithandler}>
      <div className="w-full relative">
        <input
          type="text"
          onChange={(e)=>setmessage(e.target.value)}
          value={message}
          placeholder="send a message ..."
          className="p-4 py-2 border text-sm rounded-lg block w-full bg-gray-600/40 outline-none text-white"
        />
        <button type="submit" className=" absolute flex inset-y-0 items-center end-0 px-2 text-white">
            <IoIosSend size={24}/>
        </button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlic";

export default function SendInput() {
  const [message, setMessageInput] = useState(""); // Renamed to avoid confusion with Redux state
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prevent sending an empty message or when no user is selected
    if (!message.trim() || !selectedUser) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Dispatch the new message to Redux state (append to existing messages)
      dispatch(setMessage(res?.data?.newMessage));

      // Clear the input field after sending the message
      setMessageInput("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="w-full relative">
        <input
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          value={message}
          placeholder="Send a message ..."
          className="p-4 py-2 border text-sm rounded-lg block w-full bg-gray-600/40 outline-none text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 items-center end-0 px-2 text-white"
        >
          <IoIosSend size={24} />
        </button>
      </div>
    </form>
  );
}

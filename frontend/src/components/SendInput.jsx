import React from "react";
import { IoIosSend } from "react-icons/io";

export default function SendInput() {
  return (
    <form>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="send a message ..."
          className="p-4 py-2 border text-sm rounded-lg block w-full bg-gray-600/40 outline-none text-white"
        />
        <button className=" absolute flex inset-y-0 items-center end-0 px-2 text-white">
            <IoIosSend size={24}/>
        </button>
      </div>
    </form>
  );
}

import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

export default function HomePage() {
  return (
    <div className="flex gap-2 my-4 overflow-hidden text-gray-800 h-[90%] w-[90%] bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

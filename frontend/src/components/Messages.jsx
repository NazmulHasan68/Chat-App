import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';

export default function Messages() {
  useGetMessages(); // Ensure hook is called at the top level
  const { messages } = useSelector((store) => store.message); // Access messages from Redux store

  return (
    <div className="px-4 flex-1 scrollbar-hide overflow-auto">
      {messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

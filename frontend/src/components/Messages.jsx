import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';

export default function Messages() {
  useGetMessages(); 
  const { messages } = useSelector((store) => store.message); 

  return (
    <div className="px-4 flex-1 scrollbar-hide overflow-auto">
      {messages && messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

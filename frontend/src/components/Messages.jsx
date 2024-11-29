import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import useGetMessages from '../hooks/useGetMessages';

export default function Messages() {

  useGetRealTimeMessage();

  const { messages } = useSelector((store) => store.message);

  // Safeguard against invalid `messages`
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="px-4 flex-1 scrollbar-hide overflow-auto">
      {safeMessages.length > 0 ? (
        safeMessages.map((message) => (
          <Message key={message.id || message.tempKey} message={message} />
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  );
}

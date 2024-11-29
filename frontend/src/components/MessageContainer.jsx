import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages'; // Ensure the filename case matches exactly
import { useDispatch, useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages'; // Make sure this hook is correctly implemented and imported
import { setSelectedUser } from '../redux/userSlice';

export default function MessageContainer() {
  const { selectedUser, authUser } = useSelector((store) => store.user); // Access user-related state
  const dispatch = useDispatch();

  useEffect(() => {
    // Clean up the selected user on component unmount
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]); // Added `dispatch` to the dependency array for consistency

  return (
    <>
      {selectedUser !== null ? (
        <div className="w-full flex flex-col p-2">
          {/* Header showing the selected user's profile */}
          <div className="flex items-center gap-4 rounded-md cursor-pointer bg-slate-200/40 w-full p-2">
            <div className="avatar online">
              <div className="w-10 h-10 rounded-full">
                {/* Ensure the `profilePhoto` is a valid URL */}
                <img alt="dp" src={selectedUser?.profilePhoto || '/default-avatar.png'} />
              </div>
            </div>
            <div className="text-slate-800">
              <p className="text-white font-semibold">
                {selectedUser?.fullname || 'Unknown User'} {/* Fallback for `fullname` */}
              </p>
            </div>
          </div>
          {/* Messages list */}
          <Messages />
          {/* Input for sending messages */}
          <SendInput />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          {/* Greeting for authenticated user */}
          <h1 className="text-white text-2xl font-semibold">Hi, {authUser?.fullname || 'User'}</h1>
          <h1 className="text-2xl text-white">Let's start a conversation</h1>
        </div>
      )}
    </>
  );
}

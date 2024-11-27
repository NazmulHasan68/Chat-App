import React from 'react'
import SendInput from './SendInput'
import Messages from './messages'
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages';

export default function MessageContainer() {
  const {selectedUser} = useSelector(store=>store.user)
 
  return (
    <div className='w-full flex flex-col p-2'>
      <div className='flex items-center gap-4 rounded-md cursor-pointer bg-slate-200/40 w-full p-2'>
          <div className='avatar online'>
              <div className='w-10 h-10 rounded-full'>
                  <img alt='dp' src={selectedUser?.profilePhoto}/>
              </div>
          </div>
          <div className='text-slate-800'>
              <p className='text-white font-semibold'>{selectedUser?.fullname}</p>
          </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
  )
}

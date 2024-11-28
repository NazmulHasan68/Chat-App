import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './messages'
import { useDispatch, useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages';
import { setSelectedUser } from '../redux/userSlice';

export default function MessageContainer() {
  const {selectedUser, authUser} = useSelector(store=>store.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>dispatch(setSelectedUser(null))
  },[])
 
  return (
  <>
  {selectedUser !== null ? (
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
    </div> ) :(
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-white text-2xl font-semibold'>Hi , {authUser?.fullname}</h1>
        <h1 className='text-2xl text-white'>Let's start conversation</h1>
      </div>
    )
  }

  </>
    
  )
}

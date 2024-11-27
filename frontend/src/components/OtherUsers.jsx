import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

export default function OtherUsers() {
  useGetOtherUsers()
  const {otherUsers} = useSelector(store =>store.user)
  if(!otherUsers) return //early return in react
  console.log(otherUsers);
  

  return (<div className=' scrollbar-hide overflow-auto flex-1 '>
    {
      otherUsers && otherUsers?.map((user)=>{
        return <OtherUser key={user._id} user={user}/>
      })
    }
    
  </div>
)}

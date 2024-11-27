import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

export default function OtherUsers() {
  useGetOtherUsers()
  const {otherUsers} = useSelector(store =>store.user)
  console.log(otherUsers); 
  return (<div className=' scrollbar-hide overflow-auto h-[75%] '>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
  </div>
)}

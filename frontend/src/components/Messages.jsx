import React from 'react'
import Message from './Message'
import useGetOtherUsers from '../hooks/useGetOtherUsers'


export default function Messages() {
  useGetOtherUsers()
  return (
    <div className='px-4 flex-1 scrollbar-hide overflow-auto'>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

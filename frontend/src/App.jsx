import React, { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from '../src/components/Signup'
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import {io, Socket} from 'socket.io-client'
import { setSocket } from "./redux/socketSlice"
import { setOnlineUsers } from "./redux/userSlice"


const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/register',
    element:<Signup/>
  },
  {
    path : '/login',
    element : <Login/>
  }
])

export default function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch()

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8000", {
        query:{userId:authUser._id}
      });
      dispatch(setSocket(newSocket))
     
      newSocket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })  

      return ()=> socket.close()
      
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from '../src/components/Signup'
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { useSelector } from "react-redux"
import {io} from 'socket.io-client'


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
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8000", {
        query:{userId:authUser._id}
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  )
}

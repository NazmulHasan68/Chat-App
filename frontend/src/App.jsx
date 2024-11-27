import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from '../src/components/Signup'
import HomePage from "./components/HomePage"
import Login from "./components/Login"


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
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  )
}

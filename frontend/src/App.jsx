import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

// Components
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      // Initialize Socket.IO connection
      const sockets = io("http://localhost:8000", {
        query: {
          userId: authUser.id, // Send user ID as query param (if needed)
        },
        transports: ["websocket"], // Use WebSocket transport
        reconnection: true,       // Enable automatic reconnection
      });

      setSocket(sockets);

      // Connection event
      sockets.on("connect", () => {
        console.log("Connected to Socket.IO server:", sockets.id);
      });

      // Disconnection event
      sockets.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      // Clean up on component unmount or authUser change
      return () => {
        sockets.disconnect();
        console.log("Socket.IO connection closed");
        setSocket(null);
      };
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

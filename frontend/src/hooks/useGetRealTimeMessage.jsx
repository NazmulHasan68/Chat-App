import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlic";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return; // Exit early if socket is not available

        const handleNewMessage = (newMessage) => {
            dispatch(setMessage((prevMessages) => [...prevMessages, newMessage]));
        };

        socket.on("newMessage", handleNewMessage);

        // Cleanup the event listener on unmount or socket change
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch]); // Only include `socket` and `dispatch` as dependencies
};

export default useGetRealTimeMessage;



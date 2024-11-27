import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function useGetMessages() {
const {selectedUser} = useSelector(store=>store.user)
console.log(selectedUser?._id);

  useEffect(()=>{
    const fetchMessages = async()=>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/message/${selectedUser?._id}`, {withCredentials:true})
            console.log(res);
            
        } catch (error) {
           console.log(error); 
        }
    }
    fetchMessages()
  },[])
}

export default useGetMessages


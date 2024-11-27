import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'

export default function useGetOtherUsers() {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchOtherUsers = async()=>{
            try {
                const res = await axios.get('http://localhost:8000/api/v1/user',{withCredentials:true})
                dispatch(setOtherUsers(res.data.otherUser))
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers()
    },[])
    
}

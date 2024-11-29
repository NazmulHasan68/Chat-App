import {configureStore} from '@reduxjs/toolkit'
import userReduce from './userSlice'
import messageReduce from './messageSlic'
import socketReduce from './socketSlice'

const store = configureStore({
    reducer:{
        user:userReduce,
        message:messageReduce,
        socket:socketReduce
    }
})
export default store
import {configureStore} from '@reduxjs/toolkit'
import userReduce from './userSlice'
import messageReduce from './messageSlic'

const store = configureStore({
    reducer:{
        user:userReduce,
        message:messageReduce
    }
})
export default store
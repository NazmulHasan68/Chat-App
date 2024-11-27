import {configureStore} from '@reduxjs/toolkit'
import userReduce from './userSlice'

const store = configureStore({
    reducer:{
        user:userReduce
    }
})
export default store
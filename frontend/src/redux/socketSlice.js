import { createSlice } from "@reduxjs/toolkit";

const socketSLice = createSlice({
    name:'socket',
    initialState:{
        socket:null
    },
    reducers : {
        setSocket :(state, action)=>{
            state.socket = action.payload
        }
    }
})

export const {setSocket} = socketSLice.actions
export default socketSLice.reducer
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import {app , server} from './socket/socket.js'
import userRouter from './routes/user.Route.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

// const app = express()
const PORT = 8000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOption))


//route
app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',messageRouter)


server.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
})
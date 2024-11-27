import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import userRouter from './routes/user.Route.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = 8000
app.use(express.json())
app.use(cookieParser())



//route
app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',messageRouter)


app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
})
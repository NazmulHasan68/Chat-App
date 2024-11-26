import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import userRouter from './routes/user.Route.js'
dotenv.config()

const app = express()
const PORT = 8000



//route
app.use('/api/v1/user',userRouter)


app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
})
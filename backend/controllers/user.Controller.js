import { User } from "../models/user.Model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res)=>{
    try {
       const {fullname, username , password, confirmPassword , gender } = req.body
       if(!fullname ||!username ||!password ||!confirmPassword ||!gender){
        return res.status(400).json({message : "All fields are required"})
       } 

       if(password !== confirmPassword) {
        return res.status(400).json({message:"Password do not match"})
       }

       const user = await User.findOne({username})
       if(user) {
        return res.status(400).json({message : "Username already exist try different"})
       }

       const Hashpassword = await bcryptjs.hash(password, 10)
       const maleProfilephoto = `https://avatar.iran.liara.run/public/boy?${username}`
       const FemaleProfilephoto = `https://avatar.iran.liara.run/public/girl?${username}`

       const newUser = await User.create({
        fullname,
        username,
        password: Hashpassword,
        profilePhoto : gender==='male'?maleProfilephoto:FemaleProfilephoto,
        gender: gender.toLowerCase(),
      });
  

       return res.status(200).json({success:true,newUser, message:"Account created Successfully"})
    } catch (error) {
        console.log(error);
    }
}


export const login = async(req, res) =>{
    try {
        const {username , password} = req.body
        if(!username ||!password){
            return res.status(400).json({message:"All field are required"})
        }
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message: "Incorrect username or password"
            })
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message: "Incorrect username or password"
            })
        }
        const tokendata = {
            userId : user._id
        }
        const token = await jwt.sign(tokendata, process.env.JWT,{expiresIn:'1d'})
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            _id:user._id,
            username:user.username,
            fullname:user.fullname,
            profilePhoto:user.profilePhoto
        })

    } catch (error) {
        console.log(error);
    }
}
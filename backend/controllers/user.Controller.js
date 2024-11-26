import { User } from "../models/user.Model"
import bcryptjs from 'bcryptjs'

export const register = async(req, res)=>{
    try {
       const {fullname, username , password, confirmPassword , gender } = req.body
       if(!fullname ||!username ||!password ||!confirmPassword ||!gender){
        return res.status(400).json({message : "All fields are required"})
       } 

       if(password !== confirmPassword) {
        return res.status(400).json({message:"Password do not match"})
       }

       const user = new User.create({username})
       if(user) {
        return res.status(400).json({message : "Username already exist try different"})
       }

       const Hashpassword = await bcryptjs.hash(password, 10)
       const maleProfilephoto = `https://avatar.iran.liara.run/public/boy?${username}`
       const FemaleProfilephoto = `https://avatar.iran.liara.run/public/girl?${username}`

       await User.create({
        fullname,
        username,
        password:Hashpassword,
        profilePhoto: gender===male?maleProfilephoto:FemaleProfilephoto,
        gender
       })
    } catch (error) {
        console.log(error);
    }
}
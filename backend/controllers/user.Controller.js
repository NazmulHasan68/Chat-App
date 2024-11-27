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


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
 
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect username or password" });
        }

        // Validate password
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        console.log(isPasswordMatch);
        
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect username or password" });
        }

        // Generate token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT, { expiresIn: '1d' });

        // Set cookie options
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Secure in production
        };

        // Send response
        return res.status(200).cookie("token", token, cookieOptions).json({
            success: true,
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto,
            message:"Logged in successfully!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie('token', "", {maxAge:0}).json({
            message:"logged out successfully!"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUsers = async(req, res)=>{
    try {
        const loggedInUserId = req.id
        const otherUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        if(!otherUser){
           return res.status(200).json({message:"Users not found"})
        }
        return res.status(200).json({success:true, otherUser , message:"get Other user"})
    } catch (error) {
        console.log(error);
    }
}
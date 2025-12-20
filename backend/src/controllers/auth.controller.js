import User from "../models/user.js";
import jwt from "jsonwebtoken"; 
export async function signup(req, res) {
const { email, password, fullname } = req.body;

        try {
                if (!email || !password || !fullname) {
                        return res.status(400).json({message:"all fields are required "});
                }
                if (password.length < 6) {
                        return res.status(400).json({message:"password must be at least 6 characters long"});
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
                }
                const existingUser = await User.findOne({email});
                if (existingUser) {
                        return res.status(400).json({message:"email already exists please use a different email"});
                }
                const idx=Math.floor(Math.random() * 100 )+1;
                const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

                const newUser = await User.create({
                        email,
                        password,
                        fullname,
                        profilePic:randomAvatar,
                })

                //todo create the user in stream as well

                const tokken=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});

                res.cookie("jwt",tokken,{
                        maxAge:7*24*60*60*1000,
                        httpOnly:true,//prevent xss attack
                        sameSite:"strict",//prevent csrf attack
                        secure: process.env.NODE_ENV ==="production" 
                })
                res.status(201).json({success:true,user:newUser});
        } catch (error)  {

                console.error("Error in signup controller:", error);
                res.status(500).json({message:"Internal Server Error"});
        }

}


export async function login(req, res) {
        try {
        const { email, password } = req.body;
        if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid email or password" });
        }
        
        
        const tokken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});

                res.cookie("jwt",tokken,{
                        maxAge:7*24*60*60*1000,
                        httpOnly:true,//prevent xss attack
                        sameSite:"strict",//prevent csrf attack
                        secure: process.env.NODE_ENV ==="production" 
                })
                res.status(201).json({success:true,user});
}       catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({message:"Internal Server Error"});
}}

export function logout(req, res) {
        res.clearCookie("jwt");
        res.status(200).json({success:true, message: "Logged out successfully" });
}
import express from "express";
import dotenv  from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js"
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT
app.use(cors({
    origin:["http://localhost:5173", 
    "http://localhost:5174","http://localhost:5175"],//allow frontend to send cookies
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})

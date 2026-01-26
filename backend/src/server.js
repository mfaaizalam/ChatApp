import express from "express";
import dotenv  from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js"
import aichat from "./routes/ai.routes.js"
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors({
    origin:["http://localhost:5173", 
    "http://localhost:5174","http://localhost:5175","https://chat-app-phi-silk-48.vercel.app","https://chat-app-keu9.vercel.app"],//allow frontend to send cookies
    credentials:true,
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));``
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/chat", chatRoutes);
app.use("/chat",aichat );
app.get("/", (req, res) => res.send("Backend is running!"));
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})


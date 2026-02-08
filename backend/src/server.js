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
    origin:"https://chat-app-keu9.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/chat", chatRoutes);
app.use("/chat",aichat );
app.get("/", (req, res) => res.send("Backend is running!"));
// const PORT = process.env.PORT || 3000;

export default app;

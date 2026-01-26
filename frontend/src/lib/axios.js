import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://chat-app-phi-silk-48.vercel.app/api",
    withCredentials:true, //send cookies with requests
})

// src/lib/axios.js

// frontend/src/axiosInstance.js
// import axios from "axios";

// // Dynamic baseURL: local dev or deployed backend
// const BASE_URL = import.meta.env.MODE === "production"
//   ? "https://chat-app-ioj1.vercel.app/api" // deployed backend URL
//   : "http://localhost:5001/api";          // local backend URL

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true // send cookies / JWT
// });

// export default axiosInstance;

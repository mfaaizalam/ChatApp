// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL:"http://localhost:5001/api",
//     withCredentials:true, //send cookies with requests
// })

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // use Vercel backend URL
    withCredentials: true, // send cookies with requests
})

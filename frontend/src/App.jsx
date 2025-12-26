import React from 'react'
import {Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios.js';
const App = () => {
  const {data,isLoading,error} = useQuery({ queryKey:["todos"],
    queryFn:async ()=>{
      const res =await axiosInstance.get("/api/auth/me");
      return res.data;
    },
    retry:false
  });
  console.log(data)

  return (
    <div className='h-screen' data-theme="coffee">
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/notification" element={<NotificationPage/>}/>
          <Route path="/call" element={<CallPage/>}/>
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/onboarding" element={<OnboardingPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App



// useQuery → read data from server
// useMutation → change server data
// queryKey → cache name
// invalidateQueries → reload data



// READ → useQuery
// CREATE → useMutation
// UPDATE → useMutation
// DELETE → useMutation
// REFRESH → invalidateQueries


// useQuery = fetch/read data
// useMutation = create/update/delete/change data
// queryKey = unique name/ID for your data
// invalidateQueries(queryKey) = refresh/fetch fresh data
// refetch = manually refetch data
// isLoading = data is loading
// isError = error happened
// data = the fetched data


// Axios → sends/gets data from server (HTTP requests).
// TanStack Query → manages your data in React (caching, updating, syncing).
// Together → Axios fetches or changes data, TanStack Query stores it, refreshes it, and updates your UI automatically.


// Why Axios is popular

// Fetch requires manual JSON parsing.
// Errors need manual handling.
// Axios is shorter and easier to use, especially in real projects.
import React from 'react'
import {Navigate, Route, Routes } from 'react-router'
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
  const {data:authData,isLoading,error} = useQuery({ queryKey:["authUser"],
    queryFn:async ()=>{
      const res =await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false
  });
    const authUser = authData?.user;

  return (
    <div className='h-screen ' data-theme="coffee">
      <Routes>
          <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
          <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
          <Route path="/login" element={!authUser? <LoginPage/> :<Navigate to="/"/>}/>
          <Route path="/notification" element={authUser?<NotificationPage/>:<Navigate to="/login"/>}/>
          <Route path="/call" element={authUser?<CallPage/>:<Navigate to="/login"/>}/>
          <Route path="/chat" element={authUser?<ChatPage/>:<Navigate to= "/login"/>}/>
          <Route path="/onboarding" element={authUser?<OnboardingPage/>:<Navigate to= "/login"/>}/>
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
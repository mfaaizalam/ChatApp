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

import axios from 'axios'

import PageLoader from './components/PageLoader.jsx'

import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import Chatbot from './pages/Chatbot.jsx'
const App = () => {
    const{isLoading,authUser} = useAuthUser();
    const isAuthenticated = Boolean(authUser);
    const isOnboarded = authUser


    if(isLoading){
      return <PageLoader/>;
    }

  return (
    <div className='h-screen ' data-theme="coffee">
      <Routes>
          <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
          <Route path="/signup" 
          element={
            !isAuthenticated?<SignUpPage/>:<Navigate to={isOnboarded? '/':"/onboarding"}/>}
            />
          <Route path="/login"
           element={!isAuthenticated? <LoginPage/> :<Navigate to={isOnboarded? '/':"/onboarding"}/>}
           />
          <Route path="/notifications"
           element={isAuthenticated && isOnboarded?
           (<Layout showSidebar={true}>
            <NotificationPage/>
           </Layout>):(
            <Navigate to = {isAuthenticated? "/login":"/onboarding"}/>
           )
           }
           />
          <Route path="/call" element={isAuthenticated?<CallPage/>:<Navigate to="/login"/>}/>

          <Route path="/chat/:id"
           element={isAuthenticated && isOnboarded ?(
            <Layout showSidebar={true}>
              <ChatPage/>
            </Layout>
           ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
           )}
          />   
          <Route path="/onboarding" element={isAuthenticated?<OnboardingPage/>:<Navigate to= "/login"/>}/>

          <Route path="/chatbot" element={isAuthenticated && isOnboarded ? ( 
            <Layout showSidebar={false}>
              <Chatbot />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
          />
           {/* <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />  */}
       
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
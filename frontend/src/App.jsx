import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Chatbot from "./pages/Chatbot.jsx";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useLocation } from "react-router-dom";
// upar imports ke sath
const OnboardingWrapper = ({ isAuthenticated, isOnboarded }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const forceOpen = params.get("force") === "true"; // agar /onboarding?force=true

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (forceOpen) return <OnboardingPage />; // hamesha open

  return !isOnboarded ? <OnboardingPage /> : <Navigate to="/" replace />;
};
const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded === true; // FIXED

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen">
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : isOnboarded ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : isOnboarded ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* VOICE CALL PAGE */}
        <Route
          path="/call/:id"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={false}>
                  <CallPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* CHAT PAGE */}
        <Route
          path="/chat/:id"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ONBOARDING */}
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
        {/* {/* ONBOARDING */}
{/* <Route
  path="/onboarding"
  element={
    isAuthenticated ? (
      <OnboardingPage /> // ALWAYS open, ignore isOnboarded here
    ) : (
      <Navigate to="/login" replace />
    )
  }
/> */}
<Route
  path="/onboarding"
  element={
    <OnboardingWrapper
      isAuthenticated={isAuthenticated}
      isOnboarded={isOnboarded}
    />
  }
/>


        {/* CHATBOT (PUBLIC OR AUTH ONLY?) */}
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;



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
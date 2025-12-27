import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api.js';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const queryClient = useQueryClient();
  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

   return (
    <>
      {/* 🔥 SCROLLBAR FIX (ONLY FIX ADDED) */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 🔥 FIXED ROOT WRAPPER */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full max-w-full overflow-hidden scrollbar-hide">
{/* LEFT SIDE */}
<div className="hidden lg:flex lg:w-3/5 relative overflow-hidden flex-shrink-0 bg-black">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-1/2 left-1/2 w-[80%] max-w-[80%] aspect-square object-contain -translate-x-1/2 -translate-y-1/2 rounded-full"
    ref={(video) => {
      if (video) video.playbackRate = 0.8; // slightly faster video
    }}
  >
    <source
      src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4"
      type="video/mp4"
    />
  </video>

  {/* Slightly dull overlay */}
  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

  <div className="relative z-10 flex flex-col justify-center px-16 text-white">
    <div className="flex items-center gap-4 mb-12">
      <div className="relative w-20 h-20">
        {/* Sharp curved square behind icon */}
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="6" cy="6" r="3" className="fill-emerald-500" />
            <circle cx="18" cy="6" r="3" className="fill-emerald-500" />
            <circle cx="12" cy="18" r="3" className="fill-emerald-500" />
            <path d="M8 7.5l3.5 8" className="stroke-white" />
            <path d="M16 7.5l-3.5 8" className="stroke-white" />
          </svg>
        </div>
      </div>
      <div>
        <h1 className="text-6xl font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          vTalk
        </h1>
        <p className="text-emerald-400 text-sm drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          where u belong ✨
        </p>
      </div>
    </div>

    <h2 className="text-7xl font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">Welcome Back</h2>
    <p className="text-2xl text-slate-400 mt-6 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
      the chat app that's actually fun 🚀
    </p>
  </div>
</div>





        {/* RIGHT SIDE */}
        <div className="w-full lg:w-2/5 bg-black flex items-center justify-center p-6 overflow-y-auto scrollbar-hide">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-30 rounded-3xl"></div>

              <div className="relative bg-black border border-white rounded-3xl p-8">
                <h3 className="text-3xl font-black text-white text-center mb-6">
                  Login
                </h3>
               
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                 onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="your email"
                  className="w-full mb-3 px-4 py-4 bg-black border border-slate-800 rounded-xl text-white"
                />

                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="password"
                  className="w-full mb-4 px-4 py-4 bg-black border border-slate-800 rounded-xl text-white"
                />
                <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                <button
                  onClick={() => loginMutate(loginData)}
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-black"
                >
                  {isPending ? "loading..." : "let’s go 🚀"}
                </button>
                {error && (
                  <p className="text-red-500 text-sm mt-4 text-center">
                    {error.response?.data?.message || "Login failed"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default LoginPage

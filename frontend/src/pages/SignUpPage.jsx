import React, { useState } from 'react';
import { Mail, Lock, User, CheckCircle2, Sun, Moon, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api.js';

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setSuccess(true);
      queryClient.invalidateQueries(['authUser']);
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };

  if (success) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center p-6 overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-purple-50'
      }`}>
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-black rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome to vTalk! 🎉
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Your account has been created successfully. Get ready to connect with your community!
            </p>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl shadow-blue-500/30 flex items-center gap-3 mx-auto"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex overflow-hidden`}>
      {/* Theme toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-8 right-8 z-50 p-3.5 rounded-2xl transition-all shadow-xl backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 border border-slate-700/50' 
            : 'bg-white/80 hover:bg-gray-50 text-indigo-600 border border-gray-200 shadow-lg'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Left side video section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          ref={(video) => { if(video) video.playbackRate = 0.7; }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
        </video>

        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-600/20 via-black-600/80 to-slate-950/80'
            : 'bg-gradient-to-br from-blue-600/30 via-black-600/80 to-slate-950/80'
        }`} />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-3xl blur-xl opacity-50"></div>
              <div className="relative w-14 h-14 bg-black rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2 L12 12 L17 17"/>
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">vTalk</span>
          </div>

          {/* Text content */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                Connect.<br />
                Collaborate.<br />
                Create.
              </h1>
              <p className="text-xl text-white/90 drop-shadow-lg leading-relaxed">
                Join a vibrant community where conversations spark innovation and connections last forever.
              </p>
            </div>

            <div className="grid gap-5 pt-4">
              {[{ icon: Shield, text: "Enterprise-grade security", desc: "End-to-end encryption" },
                { icon: Zap, text: "Lightning fast", desc: "Real-time messaging" },
                { icon: Users, text: "Global community", desc: "Connect worldwide" }].map((feature, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 ${
                  isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white/40 hover:bg-white/60'
                }`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg drop-shadow">{feature.text}</h3>
                    <p className="text-white/80 text-sm drop-shadow">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 h-screen ${
        isDarkMode ? 'bg-slate-950/50' : 'bg-gradient-to-br from-gray-50/50 to-blue-50/30'
      }`}>
        <div className="w-full max-w-md overflow-hidden">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2 L12 12 L17 17"/>
              </svg>
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>vTalk</span>
          </div>

          <div className="mb-10">
            <h2 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Create Account
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Start your journey in seconds
            </p>
          </div>

          {error && (
            <div className={`mb-6 p-4 rounded-2xl border ${
              isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {error?.message || 'An error occurred'}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className={`block text-sm font-semibold mb-2.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDarkMode ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-500'
                }`} />
                <input
                  type="text"
                  required
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold mb-2.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDarkMode ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-500'
                }`} />
                <input
                  type="email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-semibold mb-2.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDarkMode ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-500'
                }`} />
                <input
                  type="password"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                />
              </div>
            </div>

            {/* Terms */}
            <div className={`flex items-start gap-3 p-4 rounded-2xl ${isDarkMode ? 'bg-slate-900/30' : 'bg-gray-50'}`}>
              <input
                type="checkbox"
                id="terms"
                required
                checked={signupData.agreeToTerms}
                onChange={(e) => setSignupData({ ...signupData, agreeToTerms: e.target.checked })}
                className="mt-0.5 w-5 h-5 rounded-md text-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
              />
              <label htmlFor="terms" className={`text-sm leading-relaxed cursor-pointer ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                I agree to the{' '}
                <a href="/terms" className="text-blue-500 hover:text-blue-600 font-medium transition-colors underline decoration-blue-500/30">Terms of Service</a> and{' '}
                <a href="/privacy" className="text-blue-500 hover:text-blue-600 font-medium transition-colors underline decoration-blue-500/30">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSignup}
              disabled={isPending || !signupData.agreeToTerms}
              className="group w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating your account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <p className={`mt-8 text-center ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors underline decoration-blue-500/30">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

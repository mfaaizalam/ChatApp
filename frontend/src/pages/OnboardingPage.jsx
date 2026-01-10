import { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Sun, Moon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router-dom";
const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('vTalkTheme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('localStorage not available');
    }
  }, []);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // navigate("/");
    },
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
      navigate("/");
  };

  const handleRandomAvatar = () => {
       const idx = Math.floor(Math.random() * 1000);
  const randomAvatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${idx}`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      localStorage.setItem('vTalkTheme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('localStorage not available');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex overflow-hidden">
      <style>{`
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 p-2.5 rounded-xl transition-all shadow-lg backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 border border-slate-700/50' 
            : 'bg-white/80 hover:bg-gray-50 text-indigo-600 border border-gray-200'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Left side video section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
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
            ? 'bg-gradient-to-br from-blue-600/15 via-slate-900/70 to-slate-950/75'
            : 'bg-gradient-to-br from-blue-600/20 via-slate-800/70 to-slate-950/75'
        }`} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-2xl blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-500/90 to-cyan-500/90 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/10">
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" opacity="0.95">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M8 7.5l3.5 8" strokeWidth="2" />
                  <path d="M16 7.5l-3.5 8" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">vTalk</h1>
              <p className="text-cyan-200/80 text-xs drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">where u belong ✨</p>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-6 max-w-xl">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                Complete Your Profile
              </h1>
              <p className="text-xl text-white/95 drop-shadow-lg leading-relaxed font-medium">
                Just a few details to get you started. Let's make your profile shine!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400/50"></div>
                <p className="text-lg text-white font-medium drop-shadow-lg">Choose your languages</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400/50"></div>
                <p className="text-lg text-white font-medium drop-shadow-lg">Add your location</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400/50"></div>
                <p className="text-lg text-white font-medium drop-shadow-lg">Start connecting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className={`w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 ${
        isDarkMode ? 'bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617]' : 'bg-white'
      }`}>
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-xl blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-500/90 to-cyan-500/90 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/10">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" opacity="0.95">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M8 7.5l3.5 8" strokeWidth="2" />
                  <path d="M16 7.5l-3.5 8" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>vTalk</span>
              <p className={`text-xs ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>where u belong ✨</p>
            </div>
          </div>

          

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-4">
              <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 border-4 ${
                isDarkMode ? 'border-slate-800' : 'border-gray-200'
              }`}>
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'bg-slate-900' : 'bg-gray-100'
                  }`}>
                    <span className={`text-3xl ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>?</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
              >
                <ShuffleIcon className="w-3 h-3" />
                Generate Avatar
              </button>
            </div>

            {/* Full Name */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                placeholder="Your name"
                className={`w-full px-3 py-3 text-sm rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                    : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
              />
            </div>

            {/* Bio */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Bio
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={3}
                className={`w-full px-3 py-3 text-sm rounded-xl transition-all resize-none ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                    : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Native Language
                </label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className={`w-full px-3 py-3 text-sm rounded-xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-2 border-slate-800 text-white focus:border-blue-500 focus:bg-slate-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 focus:border-blue-500 shadow-sm'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
                >
                  <option value="">Select...</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  Learning Language
                </label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className={`w-full px-3 py-3 text-sm rounded-xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900/50 border-2 border-slate-800 text-white focus:border-blue-500 focus:bg-slate-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 focus:border-blue-500 shadow-sm'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
                >
                  <option value="">Select...</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Location
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                placeholder="City, Country"
                className={`w-full px-3 py-3 text-sm rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-2 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-900'
                    : 'bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 shadow-sm'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Completing...
                </>
              ) : (
                "Complete Profile 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
  //   const idx = Math.floor(Math.random() * 1000);
  // const randomAvatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${idx}`;
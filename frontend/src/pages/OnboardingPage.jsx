import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row h-screen w-full max-w-full overflow-hidden scrollbar-hide bg-black">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden flex-shrink-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 w-[80%] max-w-[80%] aspect-square object-contain -translate-x-1/2 -translate-y-1/2 rounded-full"
            ref={(video) => {
              if (video) video.playbackRate = 0.8;
            }}
          >
            <source
              src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="flex items-center gap-4 mb-12">
              <div className="relative w-20 h-20">
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
                <h1 className="text-6xl font-black">vTalk</h1>
                <p className="text-emerald-400 text-sm">where u belong ✨</p>
              </div>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black">Complete Profile</h2>
            <p className="text-xl lg:text-2xl text-slate-400 mt-4 lg:mt-6">
              let's get you set up 🚀
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-2/5 bg-black flex items-center justify-center p-4 sm:p-6 overflow-y-auto scrollbar-hide">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-30 rounded-3xl"></div>

              <form
                onSubmit={handleSubmit}
                className="relative bg-black border border-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
                  complete your profile
                </h3>

                <div className="flex flex-col items-center mb-3">
                  <div className="w-20 h-20 rounded-full bg-slate-950/60 border-2 border-emerald-500/30 overflow-hidden mb-2">
                    {formState.profilePic && (
                      <img
                        src={formState.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleRandomAvatar}
                    className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold"
                  >
                    Generate Avatar
                  </button>
                </div>

                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  placeholder="your name"
                  className="w-full mb-2.5 px-4 py-3 bg-black border border-slate-800 rounded-xl text-white"
                />

                <textarea
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  placeholder="bio"
                  rows={2}
                  className="w-full mb-2.5 px-4 py-3 bg-black border border-slate-800 rounded-xl text-white resize-none"
                />

                <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full px-3 py-3 bg-black border border-slate-800 rounded-xl text-white"
                  >
                    <option value="">native</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>

                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full px-3 py-3 bg-black border border-slate-800 rounded-xl text-white"
                  >
                    <option value="">learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  placeholder="location"
                  className="w-full mb-3 px-3 py-3 bg-black border border-slate-800 rounded-xl text-white"
                />

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl font-black"
                >
                  {isPending ? "loading..." : "let's go 🚀"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;

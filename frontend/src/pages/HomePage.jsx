import { useState, useEffect } from "react";
import { CheckCircle, MapPin, UserPlus, Users } from "lucide-react";

// Mock API functions
const getUserFriends = async () => {
  return [
    {
      _id: "1",
      fullName: "Sarah Johnson",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      nativeLanguage: "english",
      learningLanguage: "spanish",
      location: "New York, USA"
    },
    {
      _id: "2",
      fullName: "Carlos Rodriguez",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      nativeLanguage: "spanish",
      learningLanguage: "english",
      location: "Madrid, Spain"
    }
  ];
};

const getRecommendedUsers = async () => {
  return [
    {
      _id: "3",
      fullName: "Emma Chen",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      nativeLanguage: "chinese",
      learningLanguage: "english",
      location: "Beijing, China",
      bio: "Love practicing English through casual conversations!"
    },
    {
      _id: "4",
      fullName: "Lucas Silva",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
      nativeLanguage: "portuguese",
      learningLanguage: "french",
      location: "São Paulo, Brazil",
      bio: "Passionate about languages and cultures"
    },
    {
      _id: "5",
      fullName: "Marie Dubois",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
      nativeLanguage: "french",
      learningLanguage: "german",
      location: "Paris, France",
      bio: "Looking for German speakers to practice with!"
    }
  ];
};

const getOutgoingFriendReqs = async () => {
  return [];
};

const sendFriendRequest = async (userId) => {
  return { success: true, userId };
};

const capitialize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getLanguageFlag = (language) => {
  const flags = {
    english: "🇬🇧",
    spanish: "🇪🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    chinese: "🇨🇳",
    portuguese: "🇵🇹",
    japanese: "🇯🇵",
    korean: "🇰🇷"
  };
  return flags[language.toLowerCase()] || "🌐";
};

const FriendCard = ({ friend }) => (
  <div className="card-shine bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 animate-fadeInUp">
    <div className="flex items-center gap-3 mb-3 sm:mb-4">
      <img 
        src={friend.profilePic} 
        alt={friend.fullName}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-emerald-500 flex-shrink-0 hover:border-cyan-400 transition-colors duration-300"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-white text-base sm:text-lg truncate">{friend.fullName}</h3>
        {friend.location && (
          <div className="flex items-center text-xs text-slate-400 mt-1">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{friend.location}</span>
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-emerald-500/30 transition-colors">
        {getLanguageFlag(friend.nativeLanguage)} Native: {capitialize(friend.nativeLanguage)}
      </span>
      <span className="px-2 sm:px-3 py-1 border border-slate-700 text-slate-300 rounded-full text-xs font-semibold whitespace-nowrap hover:border-slate-600 transition-colors">
        {getLanguageFlag(friend.learningLanguage)} Learning: {capitialize(friend.learningLanguage)}
      </span>
    </div>
  </div>
);

const NoFriendsFound = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center">
    <h3 className="font-bold text-white text-lg sm:text-xl mb-2">No friends yet</h3>
    <p className="text-slate-400 text-sm sm:text-base">Start connecting with language learners below!</p>
  </div>
);

const HomePage = () => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [friends, setFriends] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [outgoingFriendReqs, setOutgoingFriendReqs] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isPending, setIsPending] = useState(false);

  // Simulate useQuery for friends
  useEffect(() => {
    const fetchFriends = async () => {
      setLoadingFriends(true);
      const data = await getUserFriends();
      setFriends(data);
      setLoadingFriends(false);
    };
    fetchFriends();
  }, []);

  // Simulate useQuery for recommended users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const data = await getRecommendedUsers();
      setRecommendedUsers(data);
      setLoadingUsers(false);
    };
    fetchUsers();
  }, []);

  // Simulate useQuery for outgoing friend requests
  useEffect(() => {
    const fetchOutgoingReqs = async () => {
      const data = await getOutgoingFriendReqs();
      setOutgoingFriendReqs(data);
    };
    fetchOutgoingReqs();
  }, []);

  // Update outgoingRequestsIds when outgoingFriendReqs changes
  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  // Simulate useMutation for sending friend request
  const sendRequestMutation = async (userId) => {
    setIsPending(true);
    await sendFriendRequest(userId);
    // Update outgoingRequestsIds immediately
    setOutgoingRequestsIds(prev => new Set([...prev, userId]));
    // Simulate queryClient.invalidateQueries
    const data = await getOutgoingFriendReqs();
    setOutgoingFriendReqs(data);
    setIsPending(false);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
        body {
          background: #000;
          overflow-y: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .card-shine {
          position: relative;
          overflow: hidden;
        }
        
        .card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .card-shine:hover::before {
          left: 100%;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
        {/* Header */}
        <div className="border-b border-slate-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 animate-fadeInUp">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 animate-float shadow-lg shadow-emerald-500/50">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="6" cy="6" r="3" className="fill-white" />
                    <circle cx="18" cy="6" r="3" className="fill-white" />
                    <circle cx="12" cy="18" r="3" className="fill-white" />
                    <path d="M8 7.5l3.5 8" className="stroke-white" />
                    <path d="M16 7.5l-3.5 8" className="stroke-white" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">vTalk</h1>
                  <p className="text-emerald-400 text-xs hidden sm:block">where u belong ✨</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fadeInUp">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">Your Friends</h2>
              <button className="px-3 sm:px-4 py-2 border border-emerald-500 text-emerald-400 rounded-xl hover:bg-emerald-500/10 hover:scale-105 transition-all flex items-center gap-2 font-semibold text-sm sm:text-base whitespace-nowrap shadow-lg shadow-emerald-500/20">
                <Users className="w-4 h-4" />
                <span className="hidden xs:inline">Friend Requests</span>
                <span className="xs:hidden">Requests</span>
              </button>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : friends.length === 0 ? (
              <NoFriendsFound />
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}

            <section className="w-full">
              <div className="mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">Meet New Learners</h2>
                    <p className="text-slate-400 mt-1 text-sm sm:text-base">
                      Discover perfect language exchange partners based on your profile
                    </p>
                  </div>
                </div>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-12">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : recommendedUsers.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">No recommendations available</h3>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Check back later for new language partners!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  {recommendedUsers.map((user) => {
                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                    return (
                      <div
                        key={user._id}
                        className="card-shine bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 w-full animate-fadeInUp"
                      >
                        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.profilePic} 
                              alt={user.fullName}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-emerald-500 flex-shrink-0 hover:border-cyan-400 hover:rotate-6 transition-all duration-300"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-base sm:text-lg text-white truncate">{user.fullName}</h3>
                              {user.location && (
                                <div className="flex items-center text-xs text-slate-400 mt-1">
                                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{user.location}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-emerald-500/30 transition-colors">
                              {getLanguageFlag(user.nativeLanguage)}
                              <span className="hidden xs:inline"> Native: </span>
                              <span className="xs:hidden">N: </span>
                              {capitialize(user.nativeLanguage)}
                            </span>
                            <span className="px-2 sm:px-3 py-1 border border-slate-700 text-slate-300 rounded-full text-xs font-semibold whitespace-nowrap hover:border-slate-600 transition-colors">
                              {getLanguageFlag(user.learningLanguage)}
                              <span className="hidden xs:inline"> Learning: </span>
                              <span className="xs:hidden">L: </span>
                              {capitialize(user.learningLanguage)}
                            </span>
                          </div>

                          {user.bio && <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">{user.bio}</p>}

                          <button
                            className={`w-full py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                              hasRequestBeenSent 
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                                : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
                            }`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span className="hidden xs:inline">Request Sent</span>
                                <span className="xs:hidden">Sent</span>
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4" />
                                <span className="hidden xs:inline">Send Friend Request</span>
                                <span className="xs:hidden">Add Friend</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
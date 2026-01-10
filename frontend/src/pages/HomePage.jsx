// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

// import { capitialize } from "../lib/utils";
// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   // Fetch friends
//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   // Fetch recommended users
//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   // Fetch outgoing friend requests
//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   // Mutation to send friend request
//   const { mutate: sendRequestMutation, isLoading: isSending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   // Keep track of outgoing requests
//   useEffect(() => {
//     const outgoingIds = new Set();
//     if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//       outgoingFriendReqs.forEach((req) => {
//         console.log(req)
//         if (req.recipient?._id) outgoingIds.add(req.recipient._id);
//       });
//       setOutgoingRequestsIds(outgoingIds);
//     }
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="relative h-screen">
//   <div className="ml-12 mr-12 pt-16 lg:pl-64 overflow-y-auto p-4 sm:p-6 lg:p-8 min-h-screen">
//       <div className="container mx-auto space-y-10">
//         {/* Friends section */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         {/* Recommended users section */}
//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">{user.fullName}</h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}


//                       {/* Send Friend Request button */}
//                       {/* Send Friend Request button */}
// <button
//   className={`btn w-full mt-2 ${
//     hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//   }`}
//   disabled={hasRequestBeenSent || isSending}
//   onClick={() => {
//     if (!user._id) return;

//     console.log("Sending friend request to:", user._id);

//     // 🔥 UI ko turant update karo
//     setOutgoingRequestsIds(prev => {
//       const newSet = new Set(prev);
//       newSet.add(user._id);
//       return newSet;
//     });

//     // 🔥 Backend call
//     sendRequestMutation(user._id);
//   }}
// >
//   {hasRequestBeenSent ? (
//     <>
//       <CheckCircleIcon className="size-4 mr-2" />
//       Request Sent
//     </>
//   ) : (
//     <>
//       <UserPlusIcon className="size-4 mr-2" />
//       Send Friend Request
//     </>
//   )}
// </button>

//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default HomePage;



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // Fetch friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Fetch recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // Fetch outgoing friend requests
  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // Mutation to send friend request
  const { mutate: sendRequestMutation, isLoading: isSending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  // Keep track of outgoing requests
  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        console.log(req)
        if (req.recipient?._id) outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);
 //search
 const [search, setSearch] = useState("");
 const [searchText, setSearchText] = useState("");

  return (
    <div className="relative">
  <div className="ml-0 sm:ml-12 pt-16 lg:pl-64 p-4 sm:p-6 lg:p-8 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="container mx-auto space-y-10">
        {/* Friends section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
          {/* Search bar */}
      <div className="join w-full mb-6">
  {/* Input */}
  <div className="relative w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>

    <input
  type="text"
  placeholder="Search learners by name..."
  className="input input-bordered join-item w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
  value={searchText}
  onChange={(e) => {
    const value = e.target.value;
    setSearchText(value);
    setSearch(value); // 👈 live search
  }}
  onKeyDown={(e) => e.key === "Enter" && setSearch(searchText)}
/>
  </div>

  {/* Button */}
  <button
    className="btn btn-primary join-item px-6 flex items-center gap-2"
    onClick={() => setSearch(searchText)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
    Search
  </button>
</div>



           


        {/* Recommended users section */}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers
              .filter(user =>
                  user.fullName?.toLowerCase().includes(search.toLowerCase()) ).map((user) => {

                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}


                      {/* Send Friend Request button */}
                      {/* Send Friend Request button */}
<button
  className={`btn w-full mt-2 ${
    hasRequestBeenSent ? "btn-disabled" : "btn-primary"
  }`}
  disabled={hasRequestBeenSent || isSending}
  onClick={() => {
    if (!user._id) return;

    console.log("Sending friend request to:", user._id);

    // 🔥 UI ko turant update karo
    setOutgoingRequestsIds(prev => {
      const newSet = new Set(prev);
      newSet.add(user._id);
      return newSet;
    });

    // 🔥 Backend call
    sendRequestMutation(user._id);
  }}
>
  {hasRequestBeenSent ? (
    <>
      <CheckCircleIcon className="size-4 mr-2" />
      Request Sent
    </>
  ) : (
    <>
      <UserPlusIcon className="size-4 mr-2" />
      Send Friend Request
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
  );
};

export default HomePage;

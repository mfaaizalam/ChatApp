// import { Link, useLocation } from "react-router-dom";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

// const Sidebar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   return (
//     <aside className="
//       text-white
//       fixed
//       left-0
//       top-16
//       h-[calc(100vh-4rem)]
//       w-64
//       bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617]
//       border-r border-base-300
//       hidden lg:flex
//       flex-col
//       overflow-y-auto
//       z-50
//     ">
//       <nav className="flex-1 p-4 space-y-1">
//         <Link
//           to="/"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
//         >
//           <HomeIcon className="size-5 text-white" />
//           <span>Home</span>
//         </Link>
//         <Link
//           to="/chatbot"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/chatbot" ? "btn-active" : ""}`}
//         >
//           <HomeIcon className="size-5 text-white" />
//           <span>Chat with AI</span>
//         </Link>
//         <Link
//           to="/notifications"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
//         >
//           <BellIcon className="size-5 text-white" />
//           <span>Notifications</span>
//         </Link>
//       </nav>

//       {/* USER PROFILE SECTION */}
//       <div className="p-4 border-t border-base-300 mt-auto">
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 rounded-full">
//               <img src={authUser?.profilePic} alt="User Avatar" />
//             </div>
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold text-sm">{authUser?.fullName}</p>
//             <p className="text-xs text-success flex items-center gap-1">
//               <span className="size-2 rounded-full bg-success inline-block" />
//               Online
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon } from "lucide-react";

const Sidebar = ({ showSidebar, closeSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`text-white fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      <aside
  className={`text-white
    fixed top-0 left-0 h-full w-full flex flex-col overflow-y-auto
    bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617]
    transform transition-transform duration-300
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-64 lg:border-r lg:flex
    z-40  /* Sidebar z-index slightly lower than Navbar */
  `}
>

        <nav className="flex-1 p-4 space-y-1 lg:p-4">
          <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn-active" : ""
            }`}
          >
            <HomeIcon className="size-5 text-white" />
            <span>Home</span>
          </Link>
          <Link
            to="/chatbot"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/chatbot" ? "btn-active" : ""
            }`}
          >
            <HomeIcon className="size-5 text-white" />
            <span>Chat with AI</span>
          </Link>
          <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
          >
            <BellIcon className="size-5 text-white" />
            <span>Notifications</span>
          </Link>
     <Link
  to="/onboarding?force=true"
  className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
    currentPath.startsWith("/onboarding") ? "btn-active" : ""
  }`}
>
  <HomeIcon className="size-5 text-white" />
  <span>Edit Profile</span>
</Link>

        </nav>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-base-300 mt-auto flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-white">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

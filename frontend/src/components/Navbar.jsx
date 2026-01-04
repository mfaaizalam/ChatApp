// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   // const queryClient = useQueryClient();
//   // const { mutate: logoutMutation } = useMutation({
//   //   mutationFn: logout,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   const { logoutMutation } = useLogout();

//   return (
//     <nav className="text-white bg-base-200 border-b border-base-300 fixed top-0 left-0 right-0 z-30 h-16 flex items-center bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-end w-full">
//           <div className="text-4xl font-bold ">
//             Vtalk
//           </div>
//           <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//             <Link to={"/notifications"}>
//               <button className="btn btn-ghost btn-circle">
//                 <BellIcon className="h-6 w-6 text-white" />
//               </button>
//             </Link>
//           </div>


//           {/* Logout button */}
//           <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
//             <LogOutIcon className="h-6 w-6 text-white" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;



import { Link } from "react-router";
import { BellIcon, LogOutIcon, MenuIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Navbar = ({ onMenuClick }) => {
  const { logoutMutation } = useLogout();

  return (
    <nav className="text-white fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-gradient-to-br from-[#0B1220] via-[#070D1A] to-[#020617] border-b border-base-300 px-4">

      <div className="flex items-center w-full">
        {/* Menu button for mobile */}
        <button
          className="lg:hidden btn btn-ghost btn-circle mr-2"
          onClick={onMenuClick}
        >
          <MenuIcon className="h-6 w-6 text-white" />
        </button>

        <div className="text-4xl font-bold">Vtalk</div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Link to={"/notifications"}>
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-white" />
            </button>
          </Link>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Layout = ({ children, showSidebar = false }) => {
//   return (
//     <div className="min-h-screen">
//       <div className="flex">
//         {showSidebar && <Sidebar />}

//         <div className="flex-1 flex flex-col">
//           <Navbar />

//           <main className="flex-1 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Layout;

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar showSidebar={sidebarOpen} closeSidebar={closeSidebar} />

      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto pt-16">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

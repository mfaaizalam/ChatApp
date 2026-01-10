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

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (!showSidebar) return;
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!showSidebar) {
      setSidebarOpen(false);
    }
  }, [showSidebar]);

  return (
    <div className="min-h-screen flex w-full">
      {showSidebar && (
        <Sidebar showSidebar={sidebarOpen} closeSidebar={closeSidebar} />
      )}

      <div className="flex-1 flex flex-col w-full">
        <Navbar onMenuClick={toggleSidebar} />

        <main className="flex-1 pt-16 overflow-hidden">

          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
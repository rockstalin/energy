
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-secondary/20">
      {!isMobile && <Sidebar />}
      <div className={`flex flex-col flex-1 w-full ${!isMobile ? 'ml-16 md:ml-64' : ''}`}>
        <Navbar />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

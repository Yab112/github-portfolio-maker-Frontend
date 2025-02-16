import type React from "react";
import Sidebar from "../sidebar/Sidebar";
import TopBar from "../topbar/TopBar";
import { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Fixed */}
      <div className="w-96 fixed inset-y-0 left-0 z-50 h-screen">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col ml-64 min-h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

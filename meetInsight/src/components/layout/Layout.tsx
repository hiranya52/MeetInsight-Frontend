import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

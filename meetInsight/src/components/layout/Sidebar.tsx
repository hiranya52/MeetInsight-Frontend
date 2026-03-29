import { Link, useLocation } from "react-router";
import { LayoutDashboard, Calendar, MessageSquare, CheckSquare, BarChart3 } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/meetings", icon: Calendar, label: "Meetings" },
  { path: "/feedback", icon: MessageSquare, label: "Feedback" },
  { path: "/tasks", icon: CheckSquare, label: "Tasks" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutModal from "../modals/logoutModal";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const getInitials = (name = "") =>
    name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  // 🔥 Base Nav Style
  const baseNav =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200";

  // 🔥 Reusable Active Class
  const getNavClass = ({ isActive }) =>
    `${baseNav} ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-screen w-64 bg-gray-950 text-gray-200 border-r border-gray-800 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow">
            {getInitials(name)}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white truncate">
              {name}
            </h2>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">

          <NavLink to="dashboard" end className={getNavClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="users" className={getNavClass}>
            <Users size={18} />
            Manage Users
          </NavLink>

          <NavLink to="orders" className={getNavClass}>
            <ShoppingBag size={18} />
            Orders
          </NavLink>

          <NavLink to="add-food" className={getNavClass}>
            <UtensilsCrossed size={18} />
            Add Foods
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            onClick={() => setLogout(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {logout && <LogoutModal onCancle={() => setLogout(false)} />}
    </>
  );
};

export default AdminSidebar;
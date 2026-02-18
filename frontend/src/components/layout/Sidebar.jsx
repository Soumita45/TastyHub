import { User, Heart, ShoppingBag, LayoutDashboard, Users, LogOut, Menu, X, Utensils,
    UtensilsCrossed
} from "lucide-react";
import { useState } from "react";
import LogoutModal from "../modals/logoutModal";
import Profile from "../../pages/Profile";
import ManageUser from "../section/ManageUser";
import AdminDashboard from "../section/AdminDashboard";

import AllOrder from "../food/AllOrder";
import Foods from "../food/Foods";

const Sidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const [logout, setLogout] = useState(false);

    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const user = localStorage.getItem("email");
  

const getDefaultTab = () => {
    if (role === "admin") return "AddFoods";
    if (role === "user") return "manu";
    return "";
};

const [activeTab, setActiveTab] = useState(getDefaultTab());


    const getInitials = (name = "") => {
        return name
            ?.trim()
            .split(" ")
            .slice(0, 2)
            .map(word => word[0])
            .join("")
            .toUpperCase();
    };

    const menuClass = (tab) =>
        `w-full flex items-center gap-3 p-3 rounded-lg transition ${
            activeTab === tab
                ? "bg-red-100 font-bold"
                : "hover:bg-red-100"
        }`;

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 bg-red-500 text-white p-2 rounded"
            >
                <Menu size={20} />
            </button>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:relative z-40
                    h-screen w-64
                    bg-white text-gray-800
                    transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    flex flex-col
                    shadow-lg
                `}
            >

                {/* Header */}
                <div className="p-4 border-b flex items-center gap-3 bg-red-500 text-white">
                    <div className="w-12 h-12 rounded-full bg-white 
                        flex items-center justify-center 
                        font-bold text-red-500 text-lg">
                        {getInitials(name)}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-sm font-semibold">{name}</h2>
                        <p className="text-xs text-red-100 truncate">
                            {user}
                        </p>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 pt-8 px-3 overflow-y-auto">
                    <div className="flex flex-col gap-3">

                        {/* USER MENU */}
                        {role === "user" && (
                            <>
                                <button onClick={() => setActiveTab("manu")} className={menuClass("home")}>
                                    <Utensils size={18} /> Menu
                                </button>

                                <button onClick={() => setActiveTab("profile")} className={menuClass("profile")}>
                                    <User size={18} /> Profile
                                </button>

                                <button onClick={() => setActiveTab("wishlist")} className={menuClass("wishlist")}>
                                    <Heart size={18} /> Wishlist
                                </button>

                                <button onClick={() => setActiveTab("orders")} className={menuClass("orders")}>
                                    <ShoppingBag size={18} /> Orders
                                </button>
                            </>
                        )}

                        {/* ADMIN MENU */}
                        {role === "admin" && (
                            <>
                                <button onClick={() => setActiveTab("dashboard")} className={menuClass("dashboard")}>
                                    <LayoutDashboard size={18} /> Dashboard
                                </button>

                                <button onClick={() => setActiveTab("manageUsers")} className={menuClass("manageUsers")}>
                                    <Users size={18} /> Manage Users
                                </button>

                                <button onClick={() => setActiveTab("manageOrders")} className={menuClass("manageOrders")}>
                                    <ShoppingBag size={18} /> Manage Orders
                                </button>

                                <button onClick={() => setActiveTab("AddFoods")} className={menuClass("AddFoods")}>
                                    <UtensilsCrossed size={18} /> Add Foods
                                </button>
                            </>
                        )}

                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => setLogout(true)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg 
                        text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                <div className="flex-1 overflow-y-auto p-6">

                    {activeTab === "manu" && <div>User Home Content</div>}
                    {activeTab === "profile" && <Profile />}
                    {activeTab === "wishlist" && <div>Wishlist Content</div>}
                    {activeTab === "orders" && <div>Orders Content</div>}

                    {activeTab === "dashboard" && <AdminDashboard />}
                    {activeTab === "manageUsers" && <ManageUser />}
                    {activeTab === "manageOrders" && <AllOrder />}
                    {activeTab === "AddFoods" &&<Foods/> }

                </div>

            </div>

            {logout && <LogoutModal onCancle={() => setLogout(false)} />}
        </div>
    );
};

export default Sidebar;

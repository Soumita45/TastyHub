import {
  User,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Utensils,
  ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../features/cartSlice";
import LogoutModal from "../modals/logoutModal";
import CartModal from "../modals/CartModal";

const UserSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const totalCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const getInitials = (name = "") =>
    name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const linkStyle = ({ isActive }) =>
    `relative flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-200
    ${isActive
      ? "bg-red-500 text-white shadow-lg scale-[1.02]"
      : "text-gray-600 hover:bg-red-50 hover:text-red-600"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-500 text-white p-2 rounded-lg shadow-md"
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
      <div
        className={`fixed z-50 h-screen w-72 bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out shadow-xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Profile Header */}
        <div className="p-6 flex items-center gap-4 border-b bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="w-14 h-14 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-lg shadow-md">
            {getInitials(name)}
          </div>
          <div>
            <h2 className="font-semibold text-base">{name}</h2>
            <p className="text-xs opacity-90 truncate">{email}</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-5 space-y-3">

          <NavLink to="/menu" className={linkStyle}>
            <Utensils size={18} />
            Menu
          </NavLink>

          <NavLink to="/profile" className={linkStyle}>
            <User size={18} />
            Profile
          </NavLink>

          <NavLink to="/orders" className={linkStyle}>
            <ShoppingBag size={18} />
            Orders
          </NavLink>

          {/* Cart with Floating Badge */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <div className="relative">
              <ShoppingCart size={20} />

              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full ">
                  {totalCount}
                </span>
              )}
            </div>

            Cart
          </button>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-5 border-t bg-white">
          <button
            onClick={() => setLogout(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {logout && <LogoutModal onCancle={() => setLogout(false)} />}
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default UserSidebar;
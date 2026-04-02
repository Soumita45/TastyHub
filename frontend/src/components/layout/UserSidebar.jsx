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
import LogoutModal from "../modals/LogoutModal";
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

  // Mobile এ link click করলে sidebar close হবে
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const linkStyle = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
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
        className={`fixed z-50
  h-dvh max-[320px]:min-h-[115dvh] sm:min-h-screen
  w-[90%] max-w-[280px] sm:max-w-[288px]
  bg-white border-r border-gray-200
  flex flex-col
  transition-transform duration-300 ease-in-out shadow-xl
  ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Header */}
        <div className="p-3 sm:p-5 lg:p-6 flex items-center gap-3 border-b bg-gradient-to-r from-red-500 to-red-600 text-white">

          {/* Responsive Logo */}
          <div
            className="
            w-8 h-8
            sm:w-10 sm:h-10
            lg:w-14 lg:h-14
            min-w-[32px]
            rounded-full
            overflow-hidden
            bg-white
            flex items-center justify-center
            shadow-md
            border-2 border-white
          "
          >
            <img
              src="/logo.png"
              alt="Tasty Hub Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-xs sm:text-sm truncate">
              {name}
            </h2>
            <p className="text-[10px] sm:text-xs opacity-90 truncate">
              {email}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            to="/menu"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            <Utensils size={18} />
            Menu
          </NavLink>

          <NavLink
            to="/profile"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            <User size={18} />
            Profile
          </NavLink>

          <NavLink
            to="/orders"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            <ShoppingBag size={18} />
            Orders
          </NavLink>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <div className="relative">
              <ShoppingCart size={20} />

              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              )}
            </div>

            Cart
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={() => setLogout(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Modals */}
      {logout && (
        <LogoutModal onCancle={() => setLogout(false)} />
      )}

      {cartOpen && (
        <CartModal onClose={() => setCartOpen(false)} />
      )}
    </>
  );
};

export default UserSidebar;
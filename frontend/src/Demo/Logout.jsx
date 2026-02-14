// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'

// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const handelSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const res = await axios.post(`http://localhost:8000/user/login`, {email, password})
//             console.log(res.data)
//             localStorage.setItem("AccessToken", res.data.accessToken)
//              localStorage.setItem("email", res.data.user.email);

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <div>
//             <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                     <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
//                         {/* Header */}
//                         <div className="text-center mb-8">
//                             <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
//                                 Welcome Back
//                             </h2>
//                             <p className="mt-2 text-sm sm:text-base text-gray-600">
//                                 Please sign in to your account
//                             </p>
//                         </div>
//                         {/* Form */}
//                         <form className="space-y-6" onSubmit={handelSubmit}>
//                             {/* Email */}
//                             <div>
//                                 <label
//                                     className="block text-sm font-medium text-gray-700"
//                                     htmlFor="email"
//                                 >
//                                     Email Address
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
//                                     required=""
//                                 />
//                             </div>
//                             {/* Password */}
//                             <div>
//                                 <label
//                                     className="block text-sm font-medium text-gray-700"
//                                     htmlFor="password"
//                                 >
//                                     Password
//                                 </label>
//                                 <div className="mt-1 relative">
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
//                                         required=""
//                                     />
//                                     <button
//                                         type="button"
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                                     >
//                                         <svg
//                                             className="h-5 w-5 text-gray-400"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                             />
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                             />
//                                         </svg>
//                                         <svg
//                                             className="h-5 w-5 text-gray-400"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                                             />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="remember"
//                                         className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                                     />
//                                     <label
//                                         htmlFor="remember"
//                                         className="ml-2 block text-sm text-gray-700"
//                                     >
//                                         Remember me
//                                     </label>
//                                 </div>
//                                 <a href="#" className="text-sm text-red-600 hover:text-red-700">
//                                     Forgot password?
//                                 </a>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                             >
//                                 <span>Sign In</span>
//                             </button>
//                         </form>
//                         <p className="mt-6 text-center text-sm">
//                             Don't have an account?
//                             <a href="#" className="font-medium text-red-600 hover:text-red-700">
//                                 Sign up now
//                             </a>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Login





import React, { useState } from 'react';
import { ShoppingCart, User, LogIn, X, Plus, Minus, Leaf, Search, Menu as MenuIcon, Home, Heart, Package, LogOut, ChevronRight } from 'lucide-react';

// Main App Component
export default function FoodOrderingApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample Products Data
  const products = [
    {
      id: 1,
      name: 'Paneer Tikka Pizza',
      price: 299,
      image: '🍕',
      category: 'Pizza',
      isVeg: true,
      description: 'Delicious pizza topped with marinated paneer tikka, bell peppers, onions, and our special sauce. Baked to perfection with extra cheese.',
      ingredients: 'Paneer, Bell Peppers, Onions, Cheese, Pizza Sauce',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Veggie Burger',
      price: 149,
      image: '🍔',
      category: 'Burgers',
      isVeg: true,
      description: 'Fresh vegetable patty with crispy lettuce, tomatoes, onions, and our signature mayo in a soft bun.',
      ingredients: 'Veggie Patty, Lettuce, Tomato, Onion, Mayo, Bun',
      rating: 4.2
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      price: 249,
      image: '🍕',
      category: 'Pizza',
      isVeg: true,
      description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves. Simple yet delicious.',
      ingredients: 'Mozzarella, Tomato Sauce, Basil, Olive Oil',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Veg Pasta',
      price: 199,
      image: '🍝',
      category: 'Pasta',
      isVeg: true,
      description: 'Creamy pasta with mixed vegetables, garlic, and Italian herbs. Served hot with garlic bread.',
      ingredients: 'Pasta, Mixed Vegetables, Cream, Garlic, Herbs',
      rating: 4.3
    },
    {
      id: 5,
      name: 'Masala Dosa',
      price: 129,
      image: '🥞',
      category: 'South Indian',
      isVeg: true,
      description: 'Crispy dosa filled with spiced potato masala, served with sambhar and coconut chutney.',
      ingredients: 'Rice, Lentils, Potato, Spices, Coconut Chutney',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Veg Biryani',
      price: 179,
      image: '🍚',
      category: 'Rice',
      isVeg: true,
      description: 'Aromatic basmati rice cooked with mixed vegetables, spices, and herbs. Served with raita.',
      ingredients: 'Basmati Rice, Mixed Vegetables, Spices, Yogurt',
      rating: 4.6
    },
    {
      id: 7,
      name: 'Spring Rolls',
      price: 99,
      image: '🥟',
      category: 'Starters',
      isVeg: true,
      description: 'Crispy fried rolls filled with cabbage, carrots, and noodles. Served with sweet chili sauce.',
      ingredients: 'Cabbage, Carrots, Noodles, Spring Roll Wrapper',
      rating: 4.1
    },
    {
      id: 8,
      name: 'Paneer Butter Masala',
      price: 229,
      image: '🍛',
      category: 'Main Course',
      isVeg: true,
      description: 'Rich and creamy tomato-based curry with soft paneer cubes. Best enjoyed with naan or rice.',
      ingredients: 'Paneer, Tomato, Butter, Cream, Spices',
      rating: 4.9
    }
  ];

  // Filter products based on search and veg filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = !filterVeg || product.isVeg;
    return matchesSearch && matchesVeg;
  });

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Toggle favorite
  const toggleFavorite = (product) => {
    const isFavorite = favorites.find(item => item.id === product.id);
    if (isFavorite) {
      setFavorites(favorites.filter(item => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  // Update cart quantity
  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Login Component
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button onClick={() => setIsLoginOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setIsLoggedIn(true);
              setUserName('Guest User');
              setIsLoginOpen(false);
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account? <span className="text-blue-600 cursor-pointer font-semibold">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );

  // Navbar Component
  const Navbar = () => (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Menu Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-700 rounded-lg transition"
            >
              <MenuIcon size={24} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🍽️</div>
              <h1 className="text-xl md:text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
                FoodHub
              </h1>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setShowCart(true)}
              className="relative hover:text-blue-200 transition"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-lg">
                <User size={20} />
                <span>{userName}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Cart Icon */}
          <button
            onClick={() => setShowCart(true)}
            className="md:hidden relative p-2"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  // Modern Side Navbar Component
  const SideNavbar = () => (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🍽️</div>
                <h2 className="text-xl font-bold">FoodHub</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-blue-800 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* User Info */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 bg-blue-700 bg-opacity-50 p-3 rounded-lg">
                <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-xs text-blue-200">Premium Member</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setSidebarOpen(false);
                }}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {/* Home */}
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  currentPage === 'home'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Home size={22} />
                  <span className="font-medium">Home</span>
                </div>
                <ChevronRight size={18} />
              </button>

              {/* Menu */}
              <button
                onClick={() => {
                  setCurrentPage('menu');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  currentPage === 'menu'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Search size={22} />
                  <span className="font-medium">Browse Menu</span>
                </div>
                <ChevronRight size={18} />
              </button>

              {/* Favorites */}
              <button
                onClick={() => {
                  setCurrentPage('favorites');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  currentPage === 'favorites'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Heart size={22} />
                  <span className="font-medium">Favorites</span>
                </div>
                <div className="flex items-center space-x-2">
                  {favorites.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                  <ChevronRight size={18} />
                </div>
              </button>

              {/* My Cart */}
              <button
                onClick={() => {
                  setShowCart(true);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart size={22} />
                  <span className="font-medium">My Cart</span>
                </div>
                <div className="flex items-center space-x-2">
                  {cart.length > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {cart.length}
                    </span>
                  )}
                  <ChevronRight size={18} />
                </div>
              </button>

              {/* Orders */}
              <button
                onClick={() => {
                  setCurrentPage('orders');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  currentPage === 'orders'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Package size={22} />
                  <span className="font-medium">My Orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  {orders.length > 0 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {orders.length}
                    </span>
                  )}
                  <ChevronRight size={18} />
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="my-4 px-3">
              <div className="border-t border-gray-200"></div>
            </div>

            {/* Additional Options */}
            <div className="space-y-1 px-3">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">⚙️</span>
                  <span className="font-medium">Settings</span>
                </div>
                <ChevronRight size={18} />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">❓</span>
                  <span className="font-medium">Help & Support</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>
          </nav>

          {/* Logout Button (if logged in) */}
          {isLoggedIn && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserName('');
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Delicious Food Delivered to Your Door</h1>
          <p className="text-lg md:text-xl mb-8">Fresh, Tasty & 100% Vegetarian Options Available</p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600">Get your food delivered hot and fresh within 30 minutes</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-4xl mb-4">🥗</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">100% Veg Options</h3>
            <p className="text-gray-600">Wide variety of delicious vegetarian dishes</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Payment</h3>
            <p className="text-gray-600">Multiple payment options for your convenience</p>
          </div>
        </div>
      </div>

      {/* Popular Items Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Popular Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                 onClick={() => {
                   setSelectedProduct(product);
                   setCurrentPage('product');
                 }}>
              <div className="text-6xl md:text-7xl p-6 md:p-8 bg-gray-50 text-center">{product.image}</div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  {product.isVeg && <Leaf className="text-green-600" size={18} />}
                </div>
                <p className="text-blue-600 font-bold">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Menu Page Component
  const MenuPage = () => (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Our Menu</h1>
        
        {/* Search and Filter */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setFilterVeg(!filterVeg)}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
              filterVeg ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Leaf size={20} />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => {
            const isFavorite = favorites.find(item => item.id === product.id);
            return (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition relative">
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                >
                  <Heart
                    size={20}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>

                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentPage('product');
                  }}
                  className="cursor-pointer"
                >
                  <div className="text-6xl md:text-7xl p-6 md:p-8 bg-gray-50 text-center">{product.image}</div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">{product.name}</h3>
                      {product.isVeg && <Leaf className="text-green-600 flex-shrink-0" size={18} />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );

  // Product Detail Page Component
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    const isFavorite = favorites.find(item => item.id === selectedProduct.id);

    return (
      <div className="min-h-screen bg-gray-50 py-6 md:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setCurrentPage('menu')}
            className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
          >
            ← Back to Menu
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Product Image */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 flex items-center justify-center relative">
                <div className="text-8xl md:text-9xl">{selectedProduct.image}</div>
                <button
                  onClick={() => toggleFavorite(selectedProduct)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
                  {selectedProduct.isVeg && (
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Leaf className="text-green-600" size={24} />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-blue-600">₹{selectedProduct.price}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="flex items-center mb-6">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="ml-1 text-gray-700 font-semibold">{selectedProduct.rating}</span>
                  <span className="ml-2 text-gray-500">(500+ ratings)</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
                  <p className="text-gray-600">{selectedProduct.ingredients}</p>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setShowCart(true);
                  }}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={24} />
                  <span>Add to Cart - ₹{selectedProduct.price}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Favorites Page Component
  const FavoritesPage = () => (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 flex items-center">
          <Heart className="mr-3 text-red-500" size={32} />
          My Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={80} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start adding your favorite dishes!</p>
            <button
              onClick={() => setCurrentPage('menu')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {favorites.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                >
                  <Heart size={20} className="fill-red-500 text-red-500" />
                </button>

                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentPage('product');
                  }}
                  className="cursor-pointer"
                >
                  <div className="text-6xl md:text-7xl p-6 md:p-8 bg-gray-50 text-center">{product.image}</div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">{product.name}</h3>
                      {product.isVeg && <Leaf className="text-green-600 flex-shrink-0" size={18} />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Orders Page Component
  const OrdersPage = () => (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 flex items-center">
          <Package className="mr-3 text-blue-600" size={32} />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={80} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Your order history will appear here</p>
            <button
              onClick={() => setCurrentPage('menu')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'On the way' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-gray-700">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-blue-600 text-lg">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Cart Sidebar Component
  const CartSidebar = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹40</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>₹{calculateTotal() + 40}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setIsLoginOpen(true);
                    setShowCart(false);
                  } else {
                    setCurrentPage('payment');
                    setShowCart(false);
                  }
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Payment Page Component
  const PaymentPage = () => (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Payment</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
              <span>Total Amount</span>
              <span>₹{calculateTotal() + 40}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Payment Method</h2>
          <div className="space-y-4">
            <button className="w-full border-2 border-gray-300 rounded-lg p-4 text-left hover:border-blue-600 hover:bg-blue-50 transition">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">💳</div>
                <div>
                  <p className="font-semibold text-gray-800">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Pay securely with your card</p>
                </div>
              </div>
            </button>

            <button className="w-full border-2 border-gray-300 rounded-lg p-4 text-left hover:border-blue-600 hover:bg-blue-50 transition">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📱</div>
                <div>
                  <p className="font-semibold text-gray-800">UPI</p>
                  <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
            </button>

            <button className="w-full border-2 border-gray-300 rounded-lg p-4 text-left hover:border-blue-600 hover:bg-blue-50 transition">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🏦</div>
                <div>
                  <p className="font-semibold text-gray-800">Net Banking</p>
                  <p className="text-sm text-gray-500">Pay via your bank account</p>
                </div>
              </div>
            </button>

            <button className="w-full border-2 border-gray-300 rounded-lg p-4 text-left hover:border-blue-600 hover:bg-blue-50 transition">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">💵</div>
                <div>
                  <p className="font-semibold text-gray-800">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when you receive</p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={() => {
              // Create new order
              const newOrder = {
                id: `ORD${Date.now()}`,
                date: new Date().toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                }),
                items: cart.map(item => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price
                })),
                total: calculateTotal() + 40,
                status: 'Preparing'
              };
              
              setOrders([newOrder, ...orders]);
              setCart([]);
              alert('Order placed successfully! 🎉');
              setCurrentPage('orders');
            }}
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Place Order - ₹{calculateTotal() + 40}
          </button>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SideNavbar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'product' && <ProductDetailPage />}
      {currentPage === 'favorites' && <FavoritesPage />}
      {currentPage === 'orders' && <OrdersPage />}
      {currentPage === 'payment' && <PaymentPage />}
      
      {isLoginOpen && <LoginModal />}
      {showCart && <CartSidebar />}
    </div>
  );
}


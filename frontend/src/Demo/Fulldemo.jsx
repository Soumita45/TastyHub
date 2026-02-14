import React, { useState, useRef } from 'react';
import { ShoppingCart, User, Heart, Menu, X, Search, LogOut, Home, Package, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample product data
const products = [
  // Biryani
  { id: 1, name: 'Chicken Biryani', category: 'biryani', type: 'non-veg', price: 250, image: '🍛', description: 'Aromatic basmati rice with tender chicken' },
  { id: 2, name: 'Veg Biryani', category: 'biryani', type: 'veg', price: 180, image: '🍛', description: 'Fragrant rice with mixed vegetables' },
  { id: 3, name: 'Mutton Biryani', category: 'biryani', type: 'non-veg', price: 320, image: '🍛', description: 'Rich and spicy mutton biryani' },
  { id: 4, name: 'Egg Biryani', category: 'biryani', type: 'non-veg', price: 150, image: '🍛', description: 'Flavorful biryani with boiled eggs' },
  { id: 5, name: 'Paneer Biryani', category: 'biryani', type: 'veg', price: 200, image: '🍛', description: 'Delicious paneer chunks in biryani' },
  
  // Burgers
  { id: 6, name: 'Veg Burger', category: 'burger', type: 'veg', price: 120, image: '🍔', description: 'Delicious vegetable patty burger' },
  { id: 7, name: 'Chicken Burger', category: 'burger', type: 'non-veg', price: 160, image: '🍔', description: 'Juicy chicken burger with sauce' },
  { id: 8, name: 'Cheese Burger', category: 'burger', type: 'veg', price: 140, image: '🍔', description: 'Classic burger with extra cheese' },
  { id: 9, name: 'Mutton Burger', category: 'burger', type: 'non-veg', price: 180, image: '🍔', description: 'Spicy mutton patty burger' },
  
  // Thali
  { id: 10, name: 'Veg Thali', category: 'thali', type: 'veg', price: 200, image: '🍱', description: 'Complete meal with dal, sabzi, roti' },
  { id: 11, name: 'Non-Veg Thali', category: 'thali', type: 'non-veg', price: 280, image: '🍱', description: 'Full meal with chicken curry & rice' },
  { id: 12, name: 'Special Thali', category: 'thali', type: 'veg', price: 250, image: '🍱', description: 'Premium veg thali with sweets' },
  { id: 13, name: 'Fish Thali', category: 'thali', type: 'non-veg', price: 300, image: '🍱', description: 'Bengali style fish thali' },
  
  // Cold Drinks
  { id: 14, name: 'Coca Cola', category: 'drinks', type: 'veg', price: 40, image: '🥤', description: 'Chilled cola drink' },
  { id: 15, name: 'Pepsi', category: 'drinks', type: 'veg', price: 40, image: '🥤', description: 'Refreshing Pepsi' },
  { id: 16, name: 'Sprite', category: 'drinks', type: 'veg', price: 40, image: '🥤', description: 'Lemon lime soda' },
  { id: 17, name: 'Fresh Lime Soda', category: 'drinks', type: 'veg', price: 50, image: '🍋', description: 'Fresh lime with soda' },
  { id: 18, name: 'Mango Shake', category: 'drinks', type: 'veg', price: 80, image: '🥤', description: 'Creamy mango shake' },
  
  // Snacks (Veg only)
  { id: 19, name: 'Samosa', category: 'snacks', type: 'veg', price: 40, image: '🥟', description: 'Crispy fried pastry with potato filling' },
  { id: 20, name: 'Paneer Tikka', category: 'snacks', type: 'veg', price: 150, image: '🧆', description: 'Grilled cottage cheese cubes' },
  { id: 21, name: 'Veg Spring Roll', category: 'snacks', type: 'veg', price: 100, image: '🥟', description: 'Crispy vegetable rolls' },
  { id: 22, name: 'Pakora', category: 'snacks', type: 'veg', price: 60, image: '🧆', description: 'Mixed vegetable fritters' },
  
  // Wings (Non-veg only)
  { id: 23, name: 'Chicken Wings', category: 'wings', type: 'non-veg', price: 200, image: '🍗', description: 'Crispy spicy chicken wings' },
  { id: 24, name: 'BBQ Wings', category: 'wings', type: 'non-veg', price: 220, image: '🍗', description: 'Smoky BBQ flavored wings' },
  { id: 25, name: 'Hot Wings', category: 'wings', type: 'non-veg', price: 210, image: '🍗', description: 'Extra spicy hot wings' },
  { id: 26, name: 'Honey Glazed Wings', category: 'wings', type: 'non-veg', price: 230, image: '🍗', description: 'Sweet and savory wings' },
];

// Category definitions with images
const vegCategories = [
  { id: 'snacks', name: 'Snacks', icon: '🥟', image: '🧆' },
];

const nonVegCategories = [
  { id: 'biryani', name: 'Biryani', icon: '🍛', image: '🍛' },
  { id: 'burger', name: 'Burger', icon: '🍔', image: '🍔' },
  { id: 'thali', name: 'Thali', icon: '🍱', image: '🍱' },
  { id: 'wings', name: 'Wings', icon: '🍗', image: '🍗' },
  { id: 'drinks', name: 'Cold Drinks', icon: '🥤', image: '🥤' },
];

function FoodOrderingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [foodTypeFilter, setFoodTypeFilter] = useState('all'); // all, veg, non-veg
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, biryani, burger, etc.
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // home, profile, wishlist, orders

  // Ref for category scrolling
  const categoryScrollRef = useRef(null);

  // All categories (both veg and non-veg)
  const allCategories = [
    { id: 'biryani', name: 'Biryani', icon: '🍛' },
    { id: 'burger', name: 'Burger', icon: '🍔' },
    { id: 'thali', name: 'Thali', icon: '🍱' },
    { id: 'wings', name: 'Chicken Wings', icon: '🍗' },
    { id: 'drinks', name: 'Cold Drinks', icon: '🥤' },
    { id: 'snacks', name: 'Snacks', icon: '🥟' },
  ];

  // Scroll functions for categories
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter products based on selections
  const filteredProducts = products.filter(product => {
    const typeMatch = foodTypeFilter === 'all' || product.type === foodTypeFilter;
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return typeMatch && categoryMatch;
  });

  // Add to cart
  const addToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPrompt(false);
  };

  // Product card component
  const ProductCard = ({ product, compact = false }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <div className="text-7xl flex items-center justify-center h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {product.image}
        </div>
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${
          product.type === 'veg' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
        }`}>
          {product.type === 'veg' ? '🌿 Veg' : '🍖 Non-Veg'}
        </div>
        {isLoggedIn && (
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart 
              className={`w-5 h-5 ${wishlist.find(i => i.id === product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
            />
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-1.5">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
          {!compact && (
            <button
              onClick={() => setSelectedProduct(product)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              View →
            </button>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Navbar for non-logged-in users
  const Navbar = () => (
    <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🍜</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              FoodieHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowLoginPrompt(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⚡ Lightning-Fast Delivery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Cravings,
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Hungry? Order from 500+ delicious dishes and get it delivered fresh to your doorstep.
              <span className="block mt-2">Fast delivery. Great taste. Unbeatable prices. 🍔🍕🍜</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowLoginPrompt(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
              >
                Start Ordering
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200">
                Explore Menu
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Menu Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Happy Foodies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">30min</div>
                <div className="text-sm text-gray-600">Quick Service</div>
              </div>
            </div>
          </div>

          {/* Right Side - Food Illustration */}
          <div className="relative">
            {/* Main Food Display */}
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Food Image Placeholder - Modern Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 flex items-center justify-center aspect-square">
                    <span className="text-6xl">🍕</span>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 flex items-center justify-center aspect-square">
                    <span className="text-6xl">🍔</span>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 flex items-center justify-center aspect-square">
                    <span className="text-6xl">🍜</span>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 flex items-center justify-center aspect-square">
                    <span className="text-6xl">🍰</span>
                  </div>
                </div>
                
                {/* Featured Item Card */}
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="bg-white rounded-lg p-3 text-4xl">
                    🍛
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Chicken Biryani</div>
                    <div className="text-sm text-gray-600">Trending Now</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">₹250</div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                      <span>⭐</span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar for logged-in users
  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-100 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🍜</div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FoodieHub
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setFoodTypeFilter('all');
                  setSelectedCategory('all');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold">Home</span>
              </button>
            </div>

            {/* User Actions */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setCurrentView('profile')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl mb-2 transition-all ${
                  currentView === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setCurrentView('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl mb-2 transition-all ${
                  currentView === 'wishlist' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="ml-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('orders')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl mb-2 transition-all ${
                  currentView === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCart([]);
                setWishlist([]);
                setFoodTypeFilter('all');
                setSelectedCategory('all');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Top bar for logged-in users
  const TopBar = () => (
    <div className="bg-white shadow-sm sticky top-0 z-30 lg:ml-0 border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex-1 max-w-xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        <button className="relative p-2 rounded-lg hover:bg-gray-50">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🍜</div>
              <span className="text-2xl font-bold text-white">FoodieHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your favorite food, delivered fast and fresh to your doorstep.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Our Menu</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Biryani</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Burgers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Thali</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Drinks</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Food Street, Asansol, West Bengal</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@foodiehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 FoodieHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to add items to cart or wishlist</p>
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                Login Now
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="text-8xl flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                {selectedProduct.image}
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold ${
                selectedProduct.type === 'veg' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {selectedProduct.type === 'veg' ? '🌿 Vegetarian' : '🍖 Non-Vegetarian'}
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-4 text-lg">{selectedProduct.description}</p>
              <div className="text-4xl font-bold text-indigo-600 mb-6">₹{selectedProduct.price}</div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        // Non-logged-in view
        <>
          <Navbar />
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        // Logged-in view with sidebar
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto">
              {currentView === 'home' && (
                <div>
                  {/* Fixed Filter Bar - Sticky at top */}
                  <div className="sticky top-0 bg-white z-20 border-b border-gray-100 shadow-sm">
                    <div className="p-4 sm:p-6">
                      {/* Veg/Non-Veg Toggle Buttons */}
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => setFoodTypeFilter('all')}
                          className={`px-4 py-2 rounded-full font-medium transition-all ${
                            foodTypeFilter === 'all'
                              ? 'bg-indigo-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setFoodTypeFilter('veg')}
                          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                            foodTypeFilter === 'veg'
                              ? 'bg-emerald-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="text-lg">🌿</span>
                          Veg
                        </button>
                        <button
                          onClick={() => setFoodTypeFilter('non-veg')}
                          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                            foodTypeFilter === 'non-veg'
                              ? 'bg-rose-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="text-lg">🍖</span>
                          Non-Veg
                        </button>
                      </div>

                      {/* Category Chips with Horizontal Scroll */}
                      <div className="relative">
                        {/* Left Arrow */}
                        <button
                          onClick={() => scrollCategories('left')}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all border border-gray-200"
                          style={{ marginLeft: '-12px' }}
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Scrollable Container */}
                        <div
                          ref={categoryScrollRef}
                          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {/* All Category */}
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all flex-shrink-0 ${
                              selectedCategory === 'all'
                                ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
                                : 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                            }`}
                            style={{ minWidth: '100px' }}
                          >
                            <div className="text-4xl">🍽️</div>
                            <span className={`text-sm font-semibold text-center leading-tight ${
                              selectedCategory === 'all' ? 'text-indigo-600' : 'text-gray-700'
                            }`}>
                              All
                            </span>
                          </button>

                          {/* Other Categories */}
                          {allCategories.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all flex-shrink-0 ${
                                selectedCategory === cat.id
                                  ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
                                  : 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                              }`}
                              style={{ minWidth: '100px' }}
                            >
                              <div className="text-4xl">{cat.icon}</div>
                              <span className={`text-sm font-semibold text-center leading-tight ${
                                selectedCategory === cat.id ? 'text-indigo-600' : 'text-gray-700'
                              }`}>
                                {cat.name}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                          onClick={() => scrollCategories('right')}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all border border-gray-200"
                          style={{ marginRight: '-12px' }}
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    {filteredProducts.length > 0 ? (
                      <>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                          {selectedCategory === 'all' 
                            ? (foodTypeFilter === 'all' 
                                ? 'All Items' 
                                : foodTypeFilter === 'veg' 
                                  ? 'Vegetarian Items' 
                                  : 'Non-Vegetarian Items')
                            : `${allCategories.find(c => c.id === selectedCategory)?.name || ''} ${
                                foodTypeFilter === 'veg' 
                                  ? '(Veg)' 
                                  : foodTypeFilter === 'non-veg' 
                                    ? '(Non-Veg)' 
                                    : ''
                              }`
                          }
                          <span className="text-gray-500 text-lg ml-2">({filteredProducts.length})</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-500 text-lg">No items found</p>
                        <p className="text-gray-400 mt-2">Try selecting different filters</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentView === 'wishlist' && (
                <div className="p-4 sm:p-6 lg:p-8">
                  <h1 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist ❤️</h1>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                      <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentView === 'profile' && (
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          S
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">Student User</h2>
                          <p className="text-gray-600">student@foodiehub.com</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-gray-600">Manage your profile settings and preferences here.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'orders' && (
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No orders yet</p>
                      <p className="text-gray-400 mt-2">Start ordering your favorite food!</p>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodOrderingApp;
import React, { useState } from 'react'
import Login from '../../pages/Login';
import Register from '../../pages/Register';


const Navbar = () => {
    const [authModal, setAuthModal] = useState(null)

    return (
        <div>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo Section */}
                        <div className="flex items-center gap-2">
                            <div className="text-3xl">🍜</div>
                            <span className="text-2xl font-bold text-red-500">
                                TastyHub
                            </span>
                        </div>

                        {/* Button Section */}
                        <div>
                            <button onClick={() => setAuthModal("login")}
                                className="bg-red-400 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition duration-300 shadow-sm">
                                Login
                            </button>
                        </div>

                    </div>
                </div>

            </nav>
            {authModal === "login" && (
                <Login
                    onClose={() => setAuthModal(null)}
                    switchToRegister={() => setAuthModal("register")} />)}

            {authModal === "register" && (
                <Register
                    onClose={() => setAuthModal(null)}
                    switchToLogin={() => setAuthModal("login")} />)}
        </div>
    )
}

export default Navbar

import React from 'react'

const Register = ({onClose, switchToLogin}) => {
  return (
    <div>
      
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative max-h-[95vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                    ×
                </button>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h3>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">Sign up to get started</p>
                    </div>

                    {/* Username Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-sm sm:text-base"
                            placeholder="Choose a username"
                            
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-sm sm:text-base"
                            placeholder="you@example.com"
                           
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                          
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition pr-12 text-sm sm:text-base"
                                placeholder="Create a password"
                               
                                required
                            />
                            <button
                                type="button"
                               
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                               
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        className="w-full bg-red-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                        Sign Up
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <button 
                         onClick={switchToLogin}
                            className="text-red-600 font-semibold hover:text-red-700 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Register

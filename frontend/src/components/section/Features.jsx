import React from 'react'
import { Zap, CheckCircle, DollarSign } from 'lucide-react';

const Features = () => {
    return (
        <div>

            <div className="bg-gradient-to-b from-gray-50 to-white py-16 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Your Favorite Food,
                            <span className="text-red-600"> Delivered Fast</span>
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            Experience the perfect blend of speed, quality, and convenience
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Feature 1 - Fast Delivery */}
                        <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full opacity-50"></div>

                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                    Loved by Foodies
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Thousands of happy customers trust us for quality, taste, and consistent satisfaction.</p>
                            </div>
                        </div>

                        {/* Feature 2 - Quality Food */}
                        <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full opacity-50"></div>

                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <CheckCircle className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                    Premium Quality
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Handpicked restaurants, fresh ingredients, and hygienically prepared meals every time
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 - Best Deals */}
                        <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full opacity-50"></div>

                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <DollarSign className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                    Fresh Ingredients
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We source high-quality, seasonal produce to ensure every dish is rich in nutrients and natural flavor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Features

import React from 'react'

const Hero = () => {
    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left side - Content */}
                    <div className="space-y-6">

                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight">
                            Your Cravings, <br />
                            <span className="text-red-600">Our Priority</span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Cravings, redefined.
                            Flavor you’ll come back for.
                            Made to delight your taste buds, every single time.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="bg-red-600 hover:bg-red-500 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                                    Get Started
                                </button>
                            <button className="bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                                Explore Menu
                            </button>

                        </div>

                       
                    </div>

                    {/* Right side - Image */}
                    <div className="relative flex justify-center">

                        <div className="relative 
                          w-56 h-56 
        sm:w-64 sm:h-64 
        md:w-80 md:h-80 
        lg:w-96 lg:h-96 
        rounded-full 
        overflow-hidden 
        shadow-2xl 
        border-4 border-red-200 
      ">

                            <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center ">
                                <img
                                    src="../images/hero.png"
                                    alt="Food"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-200 rounded-full blur-2xl opacity-50"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-300 rounded-full blur-2xl opacity-50"></div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default Hero

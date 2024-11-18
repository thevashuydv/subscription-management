import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Logo with OTT SAMADHAN */}
                    <div className="flex items-center">
                            <h2 className="ml-2 text-xl font-bold text-black">
                                OTT SAMADHAN
                            </h2>
                        <Link to="/" className="flex items-center">
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Keep your existing navigation items */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
                        <Link to="/pricing" className="text-gray-600 hover:text-gray-800">Pricing</Link>
                        {/* ... other navigation items ... */}
                    </div>

                    {/* Keep your existing auth buttons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
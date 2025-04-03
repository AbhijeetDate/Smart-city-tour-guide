
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-poppins font-bold text-2xl text-india-orange">
              <span className="text-india-saffron">India</span>
              <span className="text-india-blue">Tour</span>
              <span className="text-india-green">Scribe</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-india-orange font-medium transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-india-orange font-medium transition-colors">
              Explore
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-india-orange font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-india-orange font-medium transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

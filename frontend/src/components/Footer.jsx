// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-indigo-400">MiniProjectPlanner</h3>
            <p className="text-gray-400 text-sm">Your project planning companion</p>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MiniProjectPlanner. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
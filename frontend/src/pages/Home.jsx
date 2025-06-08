// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="my-20 flex-grow flex items-center justify-center">
        <div className="max-w-3xl text-center px-4 py-12">
          {!user ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome to <span className="text-indigo-400">MiniProjectPlanner</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Your ultimate project planning tool. Create tasks, manage dependencies, 
                and visualize your project timeline with beautiful Gantt charts.
              </p>
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/auth?type=login" 
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>
                <Link 
                  to="/auth?type=signup" 
                  className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition"
                >
                  Create Account
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome back to <span className="text-indigo-400">MiniProjectPlanner</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to plan your next project? Create a new project or continue working on existing ones.
              </p>
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                  Plan a Project
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition"
                >
                  View Projects
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
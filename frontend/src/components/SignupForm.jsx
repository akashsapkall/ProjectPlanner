import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';
import api from '../utils/api';

const SignupForm = () => {
  const [userData, setUserData] = useState({ 
    fullName: '', 
    username: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, username, email, password, confirmPassword } = userData;

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return 'Please fill in all fields.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        // signup({
        //   fullName: userData.fullName,
        //   email: userData.email
        // });
        navigate("/auth?type=login");
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create account. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-900 text-red-200 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={userData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={userData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Choose a username"
          />
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={userData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>
        
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={userData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Create a strong password"
          />
        </div>
        
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={userData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Re-enter your password"
          />
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
          I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms and Conditions</a>
        </label>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
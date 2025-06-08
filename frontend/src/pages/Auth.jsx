// src/pages/Auth.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authType = queryParams.get('type') || 'login';

  return (
    <div className="flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full my-12 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            {authType === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {authType === 'login' 
              ? 'Or ' 
              : 'Already have an account? '}
            <Link 
              to={`/auth?type=${authType === 'login' ? 'signup' : 'login'}`} 
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              {authType === 'login' ? 'create an account' : 'sign in'}
            </Link>
          </p>
        </div>
        
        <div className="mt-8">
          {authType === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
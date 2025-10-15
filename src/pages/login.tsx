import React, { useState } from 'react';

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <svg 
          className="w-8 h-8 text-blue-600" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" 
          />
        </svg>
        <span className="text-2xl font-bold text-gray-800">ComplianceCheck</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
        
        {/* Login Form */}
        {!isSignup ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="login-email" 
                  name="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter you Email" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  id="login-password" 
                  name="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter Your Password" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsSignup(true)}
                className="font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          /* Signup Form */
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-6">Get started by creating your new account.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  id="signup-name" 
                  name="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="signup-email" 
                  name="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter Your Email Address" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  id="signup-password" 
                  name="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter a Password" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => setIsSignup(false)}
                className="font-medium text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
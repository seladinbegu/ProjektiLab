import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [loggedInUsername, setLoggedInUsername] = useState(''); // Store logged-in username

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setLoggedInUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5132/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const data = await response.json();
      console.log('Login successful');
      setIsLoggedIn(true); // Set login state to true
      setLoggedInUsername(username); // Store logged-in username
      localStorage.setItem('token', data.token); // Store token in local storage
      localStorage.setItem('username', username); // Store username in local storage
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
    }
    // Reset form fields after submission
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={loggedInUsername} onLogout={handleLogout} />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 hover:underline ml-1">Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;

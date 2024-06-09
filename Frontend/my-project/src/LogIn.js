import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const LogIn = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5132/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });
      const data = await response.json();
      console.log('Server response:', data); // Log the entire response object
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      console.log('Login successful');
      const loggedInUsername = data.userName; // Extract userName from response
      console.log('Logged in as:', loggedInUsername);
      onLogin(loggedInUsername, password); // Pass userName from server response
      localStorage.setItem('token', data.token); // Store token in local storage
      localStorage.setItem('username', loggedInUsername); // Store userName from server response
      setPassword(''); // Reset password field
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid username or password. Please check your credentials and try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block">Emri i Përdoruesit:</label>
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
            <label htmlFor="password" className="block">Fjalëkalimi:</label>
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
            Kyqu
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Nuk posedoni llogari?</span>
          <Link to="/register" className="text-blue-500 hover:underline ml-1">Regjistrohu</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

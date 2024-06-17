import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import LogIn from './LogIn';
import Register from './Register';
import Punetori from './Punetori';
import Bibloteka from './Bibloteka';
import Libri from './Libri';
import Lexuesi from './Lexuesi';
import Main from './Main';
import LibriReservation from './Services/LibriReservation';
import EmailForm from './EmailForm';
import axios from 'axios';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername && storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error('Username and password are required.');
      }
  
      const response = await axios.post('http://localhost:5132/api/account/login', {
        userName: username,
        password,
      });
  
      const { data } = response; // Destructure the response
      const loggedInUsername = data.userName; // Extract username from response
      const email = data.email; // Extract email from response
      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setEmail(email);
      localStorage.setItem('username', loggedInUsername);
      localStorage.setItem('email', email);
      console.log('Logged in as:', loggedInUsername, 'with email:', email);
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login error (e.g., display error message to user)
    }
  };
  
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Router>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/punetori" element={<Punetori />} />
          <Route path="/bibloteka" element={<Bibloteka />} />
          <Route path="/libri" element={<Libri />} />
          <Route path="/lexuesi" element={<Lexuesi />} />
          <Route path="/main" element={<Main />} />
          <Route
    path="/librireservation"
    element={<LibriReservation loggedInUsername={username} userEmail={email} />} // Pass userEmail prop here
/>

          <Route path="/email" element={<EmailForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />


        </Routes>
      </Router>
    </div>
  );
}

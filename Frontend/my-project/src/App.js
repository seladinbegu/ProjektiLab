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
import LibriReservation from './LibriReservation';
import EmailForm from './EmailForm';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Cookies from 'js-cookie';
import { api, setupInterceptors } from './AxiosConfig'; // Import the configured Axios instance and setup function

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');

    // Clear cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('username');
    Cookies.remove('email');
  };

  useEffect(() => {
    setupInterceptors(handleLogout); // Setup interceptors with handleLogout

    const storedUsername = Cookies.get('username');
    const storedEmail = Cookies.get('email');
    if (storedUsername && storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      console.log('Attempting login with username:', username);
      const response = await api.post('/api/Auth/login', {
        username,
        password,
    });
    
  
      console.log('Received response:', response);
      if (response.status === 200) {
        const { accessToken, refreshToken, userName, email } = response.data;
  
        // Set cookies
        Cookies.set('accessToken', accessToken, { expires: 1 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
        Cookies.set('username', userName);
        Cookies.set('email', email);
  
        console.log('Logged in as:', userName, 'with email:', email);
        setIsLoggedIn(true);
        setUsername(userName);
        setEmail(email);
      } else {
        console.log('Login failed with status:', response.status);
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
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
          <Route path="/librireservation" element={<LibriReservation loggedInUsername={username} userEmail={email} />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
}

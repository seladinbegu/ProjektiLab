import React, { useState, useEffect, useCallback } from 'react';
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
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Cookies from 'js-cookie';
import { api, setupInterceptors } from './AxiosConfig';
import DownloadReservations from './DownloadReservations';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserId = useCallback(async () => {
    if (username) {
      try {
        const response = await api.get(`/api/Reservation/GetByUsername?username=${username}`);
        if (response.data && response.data.id) {
          setUserId(response.data.id);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }
  }, [username]);

  useEffect(() => {
    setupInterceptors(handleLogout);

    const storedUsername = Cookies.get('username');
    const storedEmail = Cookies.get('email');
    if (storedUsername && storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail);
    }

    fetchUserId().finally(() => setLoading(false));
  }, [fetchUserId]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setUserId(null);

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('username');
    Cookies.remove('email');
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post('/api/Auth/login', { username, password });

      if (response.status === 200) {
        const { accessToken, refreshToken, userName, email } = response.data;

        Cookies.set('accessToken', accessToken, { expires: 1 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
        Cookies.set('username', userName);
        Cookies.set('email', email);

        setIsLoggedIn(true);
        setUsername(userName);
        setEmail(email);
        fetchUserId();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <Route path="/librireservation" element={<LibriReservation username={username} userId={userId} email={email} />} />
          {/* <Route path="/email" element={<EmailForm />} /> */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/downloadreservations" element={<DownloadReservations />} />


        </Routes>
      </Router>
    </div>
  );
}

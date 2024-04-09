import React from 'react';
import logo1 from './images/logo1.png';
import { Link } from "react-router-dom";
import LogIn from './LogIn';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#19a1c1' }} className="text-white text-xl py-6 flex justify-between items-center">
      <div className="flex items-center">
        {/* Adjust the size of the logo using Tailwind CSS classes */}
        <Link to="/">
          <img src={logo1} alt="Logo" className="ml-4 w-20 h-auto rounded-lg" />
        </Link>
        <h1 className="ml-4 font-bold text-2xl custom-font">Inposition Library</h1>
      </div>
      <div className="flex items-center">
        <Link to="/" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4">Kreu</Link>
        <Link to="/" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4">Librat</Link>
        <Link to="/" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4">Kontakti</Link>
        <Link to="/" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4">Rreth nesh</Link>
        <button onClick={() => { window.location.href = '/login'; }} className="text-white bg-transparent border border-white hover:bg-white hover:text-blue-900 transition duration-300 ease-in-out ml-4 px-4 py-2 rounded-lg">
  Kyqu
</button>
      </div>
    </header>
  );
};

export default Header;

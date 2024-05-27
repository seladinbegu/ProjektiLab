import React from 'react';
import logo1 from './images/logo1.png';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ backgroundColor: '#19a1c1' }} className="text-white text-xl py-4 lg:py-6 flex flex-col lg:flex-row justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo1} alt="Logo" className="ml-4 w-16 lg:w-20 h-auto rounded-lg" />
        </Link>
        <h1 className="ml-2 lg:ml-4 font-bold text-lg lg:text-2xl custom-font">Inposition Library</h1>
      </div>
      <nav className="flex items-center mt-4 lg:mt-0">
        <Link to="/" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4 lg:ml-8">Kreu</Link>
        <Link to="/Libri" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4 lg:ml-8">Librat</Link>
        <Link to="/contact" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4 lg:ml-8">Kontakti</Link>
        <Link to="/about" className="text-white hover:text-blue-900 transition duration-300 ease-in-out ml-4 lg:ml-8">Rreth nesh</Link>
        <Link to="/login" className="text-white bg-transparent border border-white hover:bg-white hover:text-blue-900 transition duration-300 ease-in-out ml-2 lg:ml-4 px-3 lg:px-4 py-2 rounded-lg">
          Kyqu
        </Link>
      </nav>
    </header>
  );
};

export default Header;

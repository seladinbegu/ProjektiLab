import React from 'react';
import logo1 from './images/logo1.png';

const Header = () => {
  return (
<header style={{ backgroundColor: '#19a1c1' }} className="text-white text-xl py-6 flex justify-between items-center">
      <div className="flex items-center">
        {/* Adjust the size of the logo using Tailwind CSS classes */}
        <img src={logo1} alt="Logo" className="ml-4 w-20 h-auto rounded-lg" />
        <h1 className="ml-4 font-bold text-2xl custom-font">Inposition Library</h1>
      </div>
      <div className="flex justify-end">
        <a href="#" className="text-white hover:text-blue-900 transition duration-300 ease-in-out">Kreu</a>
        <a href="#" className="text-white ml-4 hover:text-blue-900 transition duration-300 ease-in-out">Librat</a>
        <a href="#" className="text-white ml-4 hover:text-blue-900 transition duration-300 ease-in-out">Kontakti</a>
        <a href="#" className="text-white ml-4 mr-4 hover:text-blue-900 transition duration-300 ease-in-out">Rreth nesh</a>
      </div>
    </header>
  );
};

export default Header;

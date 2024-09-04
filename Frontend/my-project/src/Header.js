import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo1 from './images/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isLoggedIn, username, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = username === 'seladin';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  const handleNavClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleSelect = (e) => {
    const selectedPage = e.target.value;
    window.location.href = selectedPage;
  };

  return (
    <header style={{ backgroundColor: '#19a1c1' }} className="text-white text-lg py-4 lg:py-6 flex flex-col lg:flex-row justify-between items-center shadow-md">
      <div className="flex items-center justify-between w-full lg:w-auto px-4">
        <Link to="/" onClick={handleNavClick} className="flex items-center hover:bg-[#1db2d4] transition duration-300 ease-in-out p-2 rounded-lg transform-gpu hover:scale-105">
          <img src={logo1} alt="Logo" className="w-12 lg:w-16 h-auto rounded-lg shadow-lg" />
          <h1 className="ml-2 lg:ml-4 font-bold text-lg lg:text-2xl custom-font">Inposition Library</h1>
        </Link>
        <button onClick={toggleMenu} className="block lg:hidden text-white focus:outline-none ml-4">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <nav className={`flex-col lg:flex-row flex lg:flex items-center mt-4 lg:mt-0 ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
        <Link to="/" className="text-white transition duration-300 ease-in-out hover:bg-[#1db2d4] hover:transform-gpu hover:translate-y-1 mt-2 lg:mt-0 ml-0 lg:ml-2 py-2 px-3 rounded-lg" onClick={handleNavClick}>Kreu</Link>
        <Link to="/librireservation" className="text-white transition duration-300 ease-in-out hover:bg-[#1db2d4] hover:transform-gpu hover:translate-y-1 mt-2 lg:mt-0 ml-0 lg:ml-2 py-2 px-3 rounded-lg" onClick={handleNavClick}>Librat</Link>
        <Link to="/contactus" className="text-white transition duration-300 ease-in-out hover:bg-[#1db2d4] hover:transform-gpu hover:translate-y-1 mt-2 lg:mt-0 ml-0 lg:ml-2 py-2 px-3 rounded-lg" onClick={handleNavClick}>Kontakti</Link>
        <Link to="/aboutus" className="text-white transition duration-300 ease-in-out hover:bg-[#1db2d4] hover:transform-gpu hover:translate-y-1 mt-2 lg:mt-0 ml-0 lg:ml-2 py-2 px-3 rounded-lg" onClick={handleNavClick}>Rreth Nesh</Link>
        {isLoggedIn ? (
          <div className="relative mt-2 lg:mt-0">
            <button onClick={toggleDropdown} className="flex items-center ml-0 lg:ml-2 focus:outline-none">
              <FontAwesomeIcon icon={faUser} className="text-white mr-2" />
              <p className="text-white">{username || 'User'}</p>
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="py-1">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Dil
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-white bg-transparent border border-white hover:bg-white hover:text-[#1db2d4] transition duration-300 ease-in-out mt-2 lg:mt-0 ml-0 lg:ml-2 px-3 lg:px-4 py-2 rounded-lg" onClick={handleNavClick}>
            Kyqu
          </Link>
        )}
        {isAdmin && (
          <div className="relative mt-2 lg:mt-0 w-full lg:w-28 ml-4 mr-1">
            <select name="adminbar" className="text-black
 bg-white border border-gray-600 pl-8 pr-2 py-1 rounded-md text-sm focus:outline-none focus:border-blue-400 w-full" onChange={handleSelect}>
 <option value=""></option>
 <option value="/lexuesi" className="text-black bg-white">Lista e Lexuesve</option>
 <option value="/libri" className="text-black bg-white">Lista e Librave</option>
 <option value="/bibloteka" className="text-black bg-white">Lista e Pikave</option>
 {/* <option value="/punetori" className="text-black bg-white">Lista e Punëtorëve</option> */}
 <option value="/downloadreservations" className="text-black bg-white">Lista e Rezervimeve</option>

</select>
</div>
)}
</nav>
</header>
);
};

export default Header;

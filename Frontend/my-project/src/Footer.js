import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Kompania */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-bold mb-4">Inposition Library</h2>
            <p className="text-sm">Ofrimi i librave dhe burimeve më të mira për kënaqësinë tuaj të leximit.</p>
          </div>

          {/* Lidhje të shpejta */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-bold mb-4">Lidhje të Shpejta</h2>
            <ul>
              <li className="mb-2">
                <a href="/" className="text-sm hover:text-blue-400">Kreu</a>
              </li>
              <li className="mb-2">
                <a href="/Libri" className="text-sm hover:text-blue-400">Librat</a>
              </li>
              <li className="mb-2">
                <a href="/kontakt" className="text-sm hover:text-blue-400">Kontakt</a>
              </li>
              <li className="mb-2">
                <a href="/rrethnesh" className="text-sm hover:text-blue-400">Rreth Nesh</a>
              </li>
            </ul>
          </div>

          {/* Informata për kontaktin */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-bold mb-4">Kontakto</h2>
            <p className="text-sm">Rruga Adem Jashari, Qyteti Vushtrri, 42000</p>
            <p className="text-sm mt-2">Email: inpositionlibrary@gmail.com</p>
            <p className="text-sm mt-2">Telefoni: +383 49 456 780</p>
          </div>

          {/* Media Sociale */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-lg font-bold mb-4">Na Ndjekni</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm lg:text-base">&copy; 2024 Inposition Library. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Na Kontaktoni</h1>
            <p className="text-lg">Jemi këtu për t'ju ndihmuar! Kontaktoni Bibliotekën Inposition për çdo pyetje apo informacion.</p>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="container mx-auto py-16 px-4 md:px-8">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Detajet e Kontaktit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Adresa</h3>
                <p className="text-lg mb-4">Rruga Adem Jashari, Vushtrri, 42000</p>

                <h3 className="text-2xl font-semibold mb-2">Numri Kontaktues</h3>
                <p className="text-lg mb-4">+383 49 456 780</p>

                <h3 className="text-2xl font-semibold mb-2">Email</h3>
                <p className="text-lg mb-4">inpositionlibrary@gmail.com</p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Orari i Punës</h3>
                <p className="text-lg mb-2">E Hënë - E Premte: <strong>08:00 - 16:00</strong></p>
                <p className="text-lg mb-2">E Shtunë: <strong>10:00 - 12:00</strong></p>
                <p className="text-lg mb-4">E Diel: <strong>Mbyllur</strong></p>

                <h3 className="text-2xl font-semibold mb-2">Na Ndjekni</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                  <button className="text-blue-600 hover:text-blue-400" onClick={() => window.open('https://www.facebook.com/yourpage')}>
                    <FontAwesomeIcon icon={faFacebookF} size="2x" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-400" onClick={() => window.open('https://www.twitter.com/yourpage')}>
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-400" onClick={() => window.open('https://www.instagram.com/yourpage')}>
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-400" onClick={() => window.open('https://www.linkedin.com/yourpage')}>
                    <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="bg-gray-200 py-16">
          <div className="container mx-auto text-center px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-6">Na Gjeni Këtu</h2>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58734.9237631092!2d21.033854672134787!3d42.82251906796504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353a95f75f08f79%3A0xc8e68724abfb1a5a!2sVushtrri!5e0!3m2!1sen!2sau!4v1615363156456!5m2!1sen!2sau" 
              width="100%" 
              height="450" 
              allowFullScreen="" 
              loading="lazy" 
              className="border-0 rounded-lg"
              title="Google Map"></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

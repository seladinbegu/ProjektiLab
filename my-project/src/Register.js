import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { name, surname, email, phoneNumber, password, confirmPassword, location });
    setName('');
    setSurname('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setLocation('');
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg flex">
          {/* Left Part */}
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-4">Regjistrohu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block">Emri:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block">Mbiemri:</label>
                <input
                  type="text"
                  id="surname"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
          </div>
          {/* Right Part */}
          <div className="w-1/2 pl-4 mt-12">
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div>
                <label htmlFor="phoneNumber" className="block">Numri i telefonit:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block">Konfirmoni Fjalëkalimin:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="location" className="block">Pika:</label>
                <select
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Zgjedhni pikën</option>
                  <option value="Vushtrri">Vushtrri</option>
                  <option value="Peje">Pejë</option>
                  <option value="Prizren">Prizren</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out">
                Regjistrohu
              </button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Posedoni një llogari?</span>
              <Link to="/login" className="text-blue-500 hover:underline ml-1">Kyqu</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

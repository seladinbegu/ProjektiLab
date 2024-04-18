import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LogIn = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { cardNumber, password });
    setCardNumber('');
    setPassword('');
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Kyqu</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardnumber" className="block">Numri i kartës:</label>
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                id="cardnumber"
                value={cardNumber}                 
                onChange={(event) => setCardNumber(event.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
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
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out">
              Kyqu
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Nuk posedoni një llogari?</span>
            <Link to="/register" className="text-blue-500 hover:underline ml-1">Regjistrohu</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    emri: '',
    emriPerdoruesit: '',
    fjalekalimi: '',
    numriTelefonit: '',
    pika: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await fetch('http://localhost:5132/api/Lexuesi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      alert('Registration successful! Welcome.');
      setError('');
      setFormData({
        emri: '',
        emriPerdoruesit: '',
        fjalekalimi: '',
        numriTelefonit: '',
        pika: '',
      });
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again later.');
    }
  };
  

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
          <div className="lg:w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="emri" className="block">Emri:</label>
                <input
                  type="text"
                  id="emri"
                  name="emri"
                  value={formData.emri}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="emriPerdoruesit" className="block">Emri Perdoruesit:</label>
                <input
                  type="text"
                  id="emriPerdoruesit"
                  name="emriPerdoruesit"
                  value={formData.emriPerdoruesit}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="fjalekalimi" className="block">Fjalëkalimi:</label>
                <input
                  type="password"
                  id="fjalekalimi"
                  name="fjalekalimi"
                  value={formData.fjalekalimi}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="numriTelefonit" className="block">Numri Telefonit:</label>
                <input
                  type="tel"
                  id="numriTelefonit"
                  name="numriTelefonit"
                  value={formData.numriTelefonit}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pika" className="block">Pika:</label>
                <select
                  id="pika"
                  name="pika"
                  value={formData.pika}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Bibloteka Pika</option>
                  <option value="Vushtrri">Vushtrri</option>
                  <option value="Pejë">Pejë</option>
                  <option value="Prizren">Prizren</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out">
                Register
              </button>
            </form>
            {error && <div className="text-red-500">{error}</div>}
            <div className="mt-4 text-center lg:text-left">
              <span className="text-gray-600">Already have an account?</span>
              <Link to="/login" className="text-blue-500 hover:underline ml-1">Log in</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

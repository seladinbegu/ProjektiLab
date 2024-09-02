import React, { useState, useEffect } from 'react';
import api from './Api';

const LibriReservation = ({ loggedInUsername, userEmail, userId }) => {
  const [librat, setLibrat] = useState([]);

  useEffect(() => {
    fetchLibrat();
  }, []);

  const fetchLibrat = async () => {
    try {
      const response = await api.get('/Libri');
      setLibrat(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
      } else {
        console.error('Error fetching books:', error);
      }
    }
  };

  const handleReserve = async (id) => {
    try {
      await api.post('/Reservations', {
        userId: loggedInUsername, // Replace with actual user ID
        libriId: id,
        reservationDate: new Date().toISOString() // Ensure this is in ISO format
      });
      alert('Reservation successful!');
    } catch (error) {
      console.error('Error reserving book:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="overflow-x-hidden overflow-y-auto mb-14">
      <div className="container mx-auto mt-8 max-w-4xl mb-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Book Reservation</h2>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Available Books</h3>
          <div className="flex flex-wrap gap-4">
            {librat.map((liber) => (
              <div key={liber.id} className="flex flex-col items-center border p-4 rounded-lg shadow-md bg-white w-72">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src={liber.burimi || 'default-image-url.png'}
                    alt={liber.titulli || 'No Title'}
                    className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                    onError={(e) => e.target.src = 'default-image-url.png'}
                  />
                </div>
                <h4 className="text-lg font-semibold text-center mb-2">
                  <span className="font-bold">{liber.titulli}</span>
                </h4>
                <p className="text-gray-700 text-center">
                  Autori: <span className="font-bold">{liber.autori}</span>
                </p>
                <p className={`text-center font-semibold ${liber.statusi === 'I Lirë' ? 'text-green-500' : 'text-red-500'}`}>
                  Statusi: {liber.statusi}
                </p>
                <button
                  onClick={() => handleReserve(liber.id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Rezervo
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibriReservation;

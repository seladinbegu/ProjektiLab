import React, { useState, useEffect } from 'react';
import api from './Api'; // Import your Axios instance
import Footer from './Footer';

const LibriForm = () => {
  const [libriData, setLibriData] = useState({
    id: '',
    titulli: '',
    autori: '',
    burimi: '',
    statusi: 'I Lirë',
    biblotekaId: ''
  });
  const [pikat, setPikat] = useState([]);
  const [librat, setLibrat] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPikat();
    fetchLibrat();
  }, []);

  const fetchPikat = async () => {
    try {
      const response = await api.get('/Bibloteka/pikat');
      setPikat(response.data);
    } catch (error) {
      console.error('Error fetching pikat:', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibriData({ ...libriData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const url = isEditing ? `/Libri/${libriData.id}` : '/Libri'; // Remove /api if baseURL is already set
  
      const payload = {
        titulli: libriData.titulli,
        autori: libriData.autori,
        burimi: libriData.burimi,
        statusi: libriData.statusi,
        biblotekaId: parseInt(libriData.biblotekaId, 10) // Ensure it's an integer
      };
  
      console.log('Submitting payload:', payload);
  
      let response;
      if (isEditing) {
        response = await api.put(url, payload); // Use PUT for editing
      } else {
        response = await api.post(url, payload); // Use POST for creating
      }
  
      console.log('Update response:', response.data);
  
      setLibriData({
        id: '',
        titulli: '',
        autori: '',
        burimi: '',
        statusi: 'I Lirë',
        biblotekaId: ''
      });
      setIsEditing(false);
      fetchLibrat(); // Refresh the list of books
    } catch (error) {
      console.error('Error creating/updating Libri:', error.response ? error.response.data : error.message);
      alert(`Error: ${error.response ? error.response.data.title : error.message}`);
    }
  };

  const handleEdit = (libri) => {
    setLibriData({
      id: libri.id,
      titulli: libri.titulli,
      autori: libri.autori,
      burimi: libri.burimi,
      statusi: libri.statusi,
      biblotekaId: libri.biblotekaId // Set the correct value for biblotekaId
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Libri/${id}`);
      fetchLibrat(); // Refresh the list of books after deletion
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
      } else {
        console.error('Error deleting Libri:', error);
      }
    }
  };

  const handleLiro = async (id) => {
    try {
      await api.post(`/Libri/${id}/liro`);
      // Refresh the list of books after marking as available
      fetchLibrat();
    } catch (error) {
      console.error("Error marking book as available:", error);
    }
  };

  const getPikaName = (id) => {
    if (!id) {
      return 'Unknown';
    }
    const pika = pikat.find(pika => pika.id === id);
    return pika ? pika.pika : 'Unknown';
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-4 bg-gray-100">
        <div className="container mx-auto mt-8 max-w-4xl mb-8 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Përmirëso Librin' : 'Krijo Librin'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="titulli" className="block text-sm font-medium text-gray-700">Titulli:</label>
                <input
                  type="text"
                  id="titulli"
                  name="titulli"
                  value={libriData.titulli}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="autori" className="block text-sm font-medium text-gray-700">Autori:</label>
                <input
                  type="text"
                  id="autori"
                  name="autori"
                  value={libriData.autori}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="burimi" className="block text-sm font-medium text-gray-700">Burimi:</label>
                <input
                  type="text"
                  id="burimi"
                  name="burimi"
                  value={libriData.burimi}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="statusi" className="block text-sm font-medium text-gray-700">Statusi:</label>
                <select
                  id="statusi"
                  name="statusi"
                  value={libriData.statusi}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="I Lirë">I Lirë</option>
                  <option value="I Zënë">I Zënë</option>
                </select>
              </div>
              <div>
                <label htmlFor="pika" className="block text-sm font-medium text-gray-700">Pika:</label>
                <select
                  id="pika"
                  name="biblotekaId"
                  value={libriData.biblotekaId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Pika</option>
                  {pikat.map((pika) => (
                    <option key={pika.id} value={pika.id}>
                      {pika.pika}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {isEditing ? 'Përmirëso' : 'Krijo'}
            </button>
          </form>
  
          {/* Display the list of books */}
          <div className="container mx-auto mt-8 max-w-7xl mb-8 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-4"> Librat</h3>
            <div className="flex flex-wrap gap-4">
              {librat.map((liber) => (
                <div
                  key={liber.id}
                  className="flex flex-col md:flex-row items-center md:items-start border border-gray-300 p-4 rounded-lg shadow-md bg-white w-full md:w-72"
                >
              <div className="relative w-full h-48 mb-4 flex justify-center items-center">
  <img
    src={liber.burimi || 'default-image-url.png'}
    alt={liber.titulli || 'Nuk ka Titull'}
    className="object-cover rounded-md border-2 border-gray-300 max-w-full max-h-full"
    onError={(e) => e.target.src = 'default-image-url.png'}
  />
</div>
  
                  {/* Text Content */}
                  <div className="flex flex-col items-center md:items-start md:ml-4 w-full">
                    <h4 className="text-lg font-semibold text-center md:text-left mb-2 text-gray-900 font-extrabold shadow-md shadow-blue-500/50 bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-lg">
                      {liber.titulli}
                    </h4>
                    <p className="text-blue-600 text-center md:text-left font-medium italic tracking-wide shadow-sm hover:text-blue-700 transition duration-300 ease-in-out">
  Autori: {liber.autori}
</p>
  
                    <p className="text-center md:text-left">
                      Statusi: <span className={`font-bold ${liber.statusi === 'I Lirë' ? 'text-green-500' : 'text-red-500'}`}>{liber.statusi}</span>
                    </p>
  
                    <p className="text-center md:text-left mt-2">
                      Pika: <span className="font-bold">{getPikaName(liber.biblotekaId)}</span>
                    </p>
  
                    {/* Buttons */}
                    <div className="flex gap-2 mt-4 justify-center md:justify-start">
                      <button
                        onClick={() => handleEdit(liber)}
                        className="bg-yellow-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                      >
                        Përmirëso
                      </button>
                      <button
                        onClick={() => handleDelete(liber.id)}
                        className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        Fshijë
                      </button>
                      {liber.statusi === 'I Zënë' && (
                        <button
                          onClick={() => handleLiro(liber.id)}
                          className="bg-green-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                        >
                          Liro
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default LibriForm;

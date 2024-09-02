import React, { useState, useEffect } from 'react';
import api from './Api'; // Import your Axios instance

const LibriForm = () => {
  const [libriData, setLibriData] = useState({
    id: '',
    titulli: '',
    autori: '',
    burimi: '',
    statusi: '',
    pika: ''
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
      const method = isEditing ? 'put' : 'post';
      const url = isEditing ? `/Libri/${libriData.id}` : '/Libri';
    
      const payload = {
        titulli: libriData.titulli,
        autori: libriData.autori,
        burimi: libriData.burimi,
        statusi: libriData.statusi,
        biblotekaId: libriData.pika // Ensure this field matches your API schema
      };
    
      await api[method](url, payload);
      setLibriData({
        id: '',
        titulli: '',
        autori: '',
        burimi: '',
        statusi: '',
        pika: ''
      });
      setIsEditing(false);
      fetchLibrat(); // Refresh the list of books
    } catch (error) {
      console.error('Error creating/updating Libri:', error.response?.data || error.message);
    }
  };

  const handleEdit = (libri) => {
    setLibriData(libri);
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

  const getPikaName = (id) => {
    if (!id) {
      return 'Unknown';
    }
    const pika = pikat.find(pika => pika.id === id);
    return pika ? pika.pika : 'Unknown';
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto mb-14">
      <div className="container mx-auto mt-8 max-w-4xl mb-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Libri' : 'Create Libri'}</h2>
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
                className="border rounded-md p-2 w-full"
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
                className="border rounded-md p-2 w-full"
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
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="statusi" className="block text-sm font-medium text-gray-700">Statusi:</label>
              <select
                id="statusi"
                name="statusi"
                value={libriData.statusi}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full bg-white text-gray-700"
              >
                <option value="I Lirë">I Lirë</option>
                <option value="I Zënë">I Zënë</option>
              </select>
            </div>
            <div>
              <label htmlFor="pika" className="block text-sm font-medium text-gray-700">Pika:</label>
              <select
                id="pika"
                name="pika"
                value={libriData.pika}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
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
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>

        {/* Display the list of books */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Existing Books</h3>
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
                <p className="text-gray-700 text-center">
                  Pika: {getPikaName(liber.biblotekaId)}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(liber)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(liber.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibriForm;

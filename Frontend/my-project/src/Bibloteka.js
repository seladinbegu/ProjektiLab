import React, { useState, useEffect } from 'react';
import api from './Api'; // Import your Axios instance
import Cookies from 'js-cookie';

const BiblotekaForm = () => {
  const [biblotekaData, setBiblotekaData] = useState({
    id: '', // Include id in the state for operations but not in the form
    pika: '',
    adresa: '',
    kontakti: ''
  });
  const [biblotekaList, setBiblotekaList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBiblotekaList();
  }, []);

  const fetchBiblotekaList = async () => {
    try {
      console.log('Making request with token:', Cookies.get('AuthToken')); // Log the token
      const response = await api.get('/Bibloteka');
      setBiblotekaList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
        // Handle unauthorized access, e.g., redirect to login
      } else {
        console.error('Error fetching Bibloteka list:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBiblotekaData({ ...biblotekaData, [name]: value });
  };

  const handleEdit = (bibloteka) => {
    setBiblotekaData({ ...bibloteka });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'put' : 'post';
      const url = isEditing
        ? `/Bibloteka/${biblotekaData.id}` // Use id for PUT
        : '/Bibloteka';

      await api[method](url, {
        pika: biblotekaData.pika,
        adresa: biblotekaData.adresa,
        kontakti: biblotekaData.kontakti
      }); // Exclude id from POST data

      fetchBiblotekaList();
      setBiblotekaData({ id: '', pika: '', adresa: '', kontakti: '' });
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
        // Redirect to login or handle logout
      } else {
        console.error('Error creating/updating Bibloteka:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Bibloteka/${id}`); // Use id for DELETE
      fetchBiblotekaList();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
        // Redirect to login or handle logout
      } else {
        console.error('Error deleting Bibloteka:', error);
      }
    }
  };

  console.log('AccessToken:', Cookies.get('accessToken'));

  return (
    <div className="overflow-x-hidden overflow-y-auto mb-14">
      <div className="container mx-auto mt-8 max-h-screen mb-8">
        <h2 className="text-2xl font-bold mb-4">Pikat</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="pika">Pika:</label>
              <input
                type="text"
                id="pika"
                name="pika"
                value={biblotekaData.pika}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="adresa">Adresa:</label>
              <input
                type="text"
                id="adresa"
                name="adresa"
                value={biblotekaData.adresa}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="kontakti">Kontakti:</label>
              <input
                type="text"
                id="kontakti"
                name="kontakti"
                value={biblotekaData.kontakti}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isEditing ? 'Përmirëso' : 'Krijo'}
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-8">Lista e Pikave</h2>
        <ul>
          {biblotekaList.map((bibloteka) => (
            <li key={bibloteka.id} className="mt-4 border rounded-md p-4">
              <p>Pika: {bibloteka.pika}</p>
              <p>Adresa: {bibloteka.adresa}</p>
              <p>Kontakti: {bibloteka.kontakti}</p>
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-600"
                  onClick={() => handleEdit(bibloteka)}
                >
                  Përmirëso
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(bibloteka.id)} // Pass id to delete
                >
                  Fshijë
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BiblotekaForm;

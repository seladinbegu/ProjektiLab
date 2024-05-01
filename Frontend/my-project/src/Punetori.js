import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Punetori() {
  const [punetoriData, setPunetoriData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    emri: '',
    pozita: '',
    pika: ''
  });
  const [fetchType, setFetchType] = useState(null);
  const [selectedPunetoriId, setSelectedPunetoriId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = 'http://localhost:5132/api/punetori';

      if (fetchType === 'all') {
        // Fetch all data
      } else if (fetchType === 'pika') {
        // Fetch by pika
        url += `/bypika/${formData.pika}`;
      } else if (fetchType === 'pozita') {
        // Fetch by pozita
        url += `/bypozita/${formData.pozita}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPunetoriData(data); // Update punetoriData with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchType, formData]);

  const handleFetchAll = () => {
    setFetchType('all');
    setFormData({
      id: '',
      emri: '',
      pozita: '',
      pika: ''
    });
  };

  const handleFetchByPika = () => {
    setFetchType('pika');
    setPunetoriData([]); // Clear existing data
  };

  const handleFetchByPozita = () => {
    setFetchType('pozita');
    setPunetoriData([]); // Clear existing data
  };

  const handlePikaChange = (e) => {
    setFormData({ ...formData, pika: e.target.value });
  };

  const handlePozitaChange = (e) => {
    setFormData({ ...formData, pozita: e.target.value });
  };

  const handleCreatePunetori = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5132/api/punetori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPunetoriData([...punetoriData, data]);
      setFormData({
        id: '',
        emri: '',
        pozita: '',
        pika: ''
      });
    } catch (error) {
      console.error('Error creating punetori:', error);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (id) => {
    setSelectedPunetoriId(id);
    const selectedPunetori = punetoriData.find(item => item.id === id);
    setFormData({
      id: selectedPunetori.id,
      emri: selectedPunetori.emri,
      pozita: selectedPunetori.pozita,
      pika: selectedPunetori.pika
    });
  };

  const handleUpdatePunetori = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5132/api/punetori/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedPunetori = await response.json();
      const updatedPunetoriList = punetoriData.map(item => (item.id === updatedPunetori.id ? updatedPunetori : item));
      setPunetoriData(updatedPunetoriList);
      setFormData({
        id: '',
        emri: '',
        pozita: '',
        pika: ''
      });
      setSelectedPunetoriId(null); // Reset selected punetori ID
    } catch (error) {
      console.error('Error updating punetori:', error);
    }
  };

  const handleDeletePunetori = async (id) => {
    if (window.confirm('Are you sure you want to delete this punetori?')) {
      try {
        const response = await fetch(`http://localhost:5132/api/punetori/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setPunetoriData(punetoriData.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting punetori:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 overflow-y-auto">
        <div className="max-w-lg mx-auto mt-8 bg-white shadow-md p-8 rounded-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6"> Lista e Punetorëve</h1>
          <div className="space-y-4">
          <div className="flex justify-between mb-4">
  <button 
    onClick={handleFetchAll} 
    className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2" // Adjusted padding for smaller screens
  >
    Gjithsej
  </button>
  <button 
    onClick={handleFetchByPika} 
    className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2" // Adjusted padding for smaller screens
  >
    Sipas Pikës
  </button>
  <button 
    onClick={handleFetchByPozita} 
    className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:px-4 sm:py-2" // Adjusted padding for smaller screens
  >
    Sipas Pozitës
  </button>
</div>

            {fetchType === 'pika' && (
              <div className="mb-4">
                <label htmlFor="pika" className="block text-sm font-medium text-gray-700">Zgjedhni Pikën:</label>
                <select id="pika" name="pika" value={formData.pika} onChange={handlePikaChange} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="Pejë">Pejë</option>
                  <option value="Vushtrri">Vushtrri</option>
                  <option value="Prizren">Prizren</option>
                </select>
              </div>
            )}
            {fetchType === 'pozita' && (
              <div className="mb-4">
                <label htmlFor="pozita" className="block text-sm font-medium text-gray-700">Zgjedhni Pozitën:</label>
                <select id="pozita" name="pozita" value={formData.pozita} onChange={handlePozitaChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="Punetor">Punëtor</option>
                  <option value="Menaxher">Menaxher</option>
                  <option value="Arkatar">Arkatar</option>
                </select>
              </div>
            )}
            {punetoriData.length > 0 ? (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-xl font-semibold text-gray-800 mt-6">Punëtorët Ekzistues</h2>
                <div className="max-h-96 overflow-y-auto">
                  {punetoriData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 mt-4">
                      {/* <p className="text-lg font-semibold">Id: {item.id}</p> */}
                      <p><span className="font-semibold">Emri:</span> {item.emri}</p>
                      <p><span className="font-semibold">Pozita:</span> {item.pozita}</p>
                      <p><span className="font-semibold">Pika:</span> {item.pika}</p>
                      {/* Update and Delete buttons */}
                      <div className="flex justify-end mt-2">
                        <button onClick={() => handleUpdateClick(item.id)} className="px-3 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Përmirëso</button>
                        {/* Implement delete functionality here */}
                        <button onClick={() => handleDeletePunetori(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Fshijë</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Asnjë punëtor i disponueshëm.</p>
            )}
            {/* Update punetori form */}
            {selectedPunetoriId && (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-xl font-semibold text-gray-800 mt-6">Përmirëso Punëtorin</h2>
                <form onSubmit={handleUpdatePunetori} className="mt-4">
                  <input type="hidden" name="id" value={formData.id} />
                  <input type="text" name="emri" value={formData.emri} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  <fieldset className="mt-4">
                    <legend className="block text-sm font-medium text-gray-700">Pozita:</legend>
                    <div className="mt-1 flex space-x-4">
                      <div>
                        <input type="radio" id="punetor" name="pozita" value="Punetor" checked={formData.pozita === 'Punetor'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="punetor" className="ml-2 block text-sm text-gray-900">Punëtor</label>
                      </div>
                      <div>
                        <input type="radio" id="menaxher" name="pozita" value="Menaxher" checked={formData.pozita === 'Menaxher'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="menaxher" className="ml-2 block text-sm text-gray-900">Menaxher</label>
                      </div>
                      <div>
                        <input type="radio" id="arkatar" name="pozita" value="Arkatar" checked={formData.pozita === 'Arkatar'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="arkatar" className="ml-2 block text-sm text-gray-900">Arkatar</label>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="mt-4">
                    <legend className="block text-sm font-medium text-gray-700">Pika:</legend>
                    <div className="mt-1 flex space-x-4">
                      <div>
                        <input type="radio" id="peje" name="pika" value="Pejë" checked={formData.pika === 'Pejë'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="peje" className="ml-2 block text-sm text-gray-900">Pejë</label>
                      </div>
                      <div>
                        <input type="radio" id="vushtrri" name="pika" value="Vushtrri" checked={formData.pika === 'Vushtrri'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="vushtrri" className="ml-2 block text-sm text-gray-900">Vushtrri</label>
                      </div>
                      <div>
                        <input type="radio" id="prizren" name="pika" value="Prizren" checked={formData.pika === 'Prizren'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="prizren" className="ml-2 block text-sm text-gray-900">Prizren</label>
                      </div>
                    </div>
                  </fieldset>
                  <button type="submit" className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Punëtor</button>
                </form>
              </div>
            )}
            <form onSubmit={handleCreatePunetori}>
              {/* Create punetori form */}
              <div className="mb-4 mt-14">
                <h1 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Krijo Punëtorin</h1>
                <label htmlFor="emri" className="block text-sm font-medium text-gray-700">Emri dhe Mbiemri:</label>
                <input type="text" id="emri" name="emri" value={formData.emri} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700">Pozita:</legend>
                  <div className="mt-1 flex space-x-4">
                    <div>
                      <input type="radio" id="punetor" name="pozita" value="Punetor" checked={formData.pozita === 'Punetor'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="punetor" className="ml-2 block text-sm text-gray-900">Punëtor</label>
                    </div>
                    <div>
                      <input type="radio" id="menaxher" name="pozita" value="Menaxher" checked={formData.pozita === 'Menaxher'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="menaxher" className="ml-2 block text-sm text-gray-900">Menaxher</label>
                    </div>
                    <div>
                      <input type="radio" id="arkatar" name="pozita" value="Arkatar" checked={formData.pozita === 'Arkatar'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="arkatar" className="ml-2 block text-sm text-gray-900">Arkatar</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="mb-4">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700">Pika:</legend>
                  <div className="mt-1 flex space-x-4">
                    <div>
                      <input type="radio" id="peje" name="pika" value="Pejë" checked={formData.pika === 'Pejë'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="peje" className="ml-2 block text-sm text-gray-900">Pejë</label>
                    </div>
                    <div>
                      <input type="radio" id="vushtrri" name="pika" value="Vushtrri" checked={formData.pika === 'Vushtrri'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="vushtrri" className="ml-2 block text-sm text-gray-900">Vushtrri</label>
                    </div>
                    <div>
                      <input type="radio" id="prizren" name="pika" value="Prizren" checked={formData.pika === 'Prizren'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="prizren" className="ml-2 block text-sm text-gray-900">Prizren</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-14">Krijo Punëtor</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Punetori;

import React, { useState, useEffect } from 'react';

const BiblotekaForm = () => {
  const [biblotekaData, setBiblotekaData] = useState({
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
      const response = await fetch('http://localhost:5132/api/Bibloteka');
      const data = await response.json();
      setBiblotekaList(data);
    } catch (error) {
      console.error('Gabim në marrjen e pikave:', error);
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
      if (isEditing) {
        await fetch(`http://localhost:5132/api/Bibloteka/${biblotekaData.pika}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(biblotekaData)
        });
      } else {
        await fetch('http://localhost:5132/api/Bibloteka', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(biblotekaData)
        });
      }
      fetchBiblotekaList();
      setBiblotekaData({ pika: '', adresa: '', kontakti: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Gabim në krijimin/përditësimin e biblotekës:', error);
    }
  };

  const handleDelete = async (pika) => {
    try {
      await fetch(`http://localhost:5132/api/Bibloteka/${pika}`, {
        method: 'DELETE'
      });
      fetchBiblotekaList();
    } catch (error) {
      console.error('Gabim në fshirjen e biblotekës:', error);
    }
  };

  return (
    <>

    <div className="overflow-x-hidden overflow-y-auto mb-14">
      <div className="container mx-auto mt-8 max-h-screen mb-8">
        <h2 className="text-2xl font-bold mb-4">Pikat</h2>
        <div className="flex justify-end mb-4">
          
          {isEditing && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Përmirëso
            </button>
          )}
        </div>
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
                enabled={isEditing}
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
            <li key={bibloteka.pika} className="mt-4 border rounded-md p-4">
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
                  onClick={() => handleDelete(bibloteka.pika)}
                >
                  Fshijë
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
          </>

  );
  
};

export default BiblotekaForm;

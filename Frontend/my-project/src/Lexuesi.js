import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Lexuesi = () => {
  const [lexuesiData, setLexuesiData] = useState({
    id: '',
    emri: '',
    emriPerdoruesit: '',
    fjalekalimi: '',
    numriTelefonit: '',
    bibloteka: ''
  });

  const [lexuesiList, setLexuesiList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLexuesiList();
  }, []);

  const fetchLexuesiList = async () => {
    try {
      const response = await fetch('http://localhost:5132/api/Lexuesi');
      const data = await response.json();
      setLexuesiList(data);
    } catch (error) {
      console.error('Error fetching lexuesi list:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLexuesiData({ ...lexuesiData, [name]: value });
  };

  const handleEdit = (lexuesi) => {
    setLexuesiData({ ...lexuesi });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encryptedPassword = encryptPassword(lexuesiData.fjalekalimi);
      const updatedLexuesiData = { ...lexuesiData, fjalekalimi: encryptedPassword };

      if (isEditing) {
        await fetch(`http://localhost:5132/api/Lexuesi/${updatedLexuesiData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedLexuesiData)
        });
      } else {
        await fetch('http://localhost:5132/api/Lexuesi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedLexuesiData)
        });
      }
      fetchLexuesiList();
      setLexuesiData({ id: '', emri: '', emriPerdoruesit: '', fjalekalimi: '', numriTelefonit: '', bibloteka: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating/updating lexuesi:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5132/api/Lexuesi/${id}`, {
        method: 'DELETE'
      });
      fetchLexuesiList();
    } catch (error) {
      console.error('Error deleting lexuesi:', error);
    }
  };

  const encryptPassword = (password) => {
    return btoa(password);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Lexuesi List</h2>
        <ul>
          {lexuesiList.map((lexuesi) => (
            <li key={lexuesi.id} className="bg-white shadow-md rounded-lg mb-4 p-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{lexuesi.emri}</p>
                <p>{lexuesi.emriPerdoruesit} | {lexuesi.numriTelefonit} | {lexuesi.bibloteka} | Password: {encryptPassword(lexuesi.fjalekalimi)}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(lexuesi)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Edit</button>
                <button onClick={() => handleDelete(lexuesi.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Lexuesi' : 'Add Lexuesi'}</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 mb-8">
          
          <input type="text" name="emri" value={lexuesiData.emri} onChange={handleInputChange} placeholder="Emri" className="w-full border border-gray-300 px-4 py-2 mb-4 rounded" />
          <input type="text" name="emriPerdoruesit" value={lexuesiData.emriPerdoruesit} onChange={handleInputChange} placeholder="Emri Perdoruesit" className="w-full border border-gray-300 px-4 py-2 mb-4 rounded" />
          <input type="password" name="fjalekalimi" value={lexuesiData.fjalekalimi} onChange={handleInputChange} placeholder="Fjalekalimi" className="w-full border border-gray-300 px-4 py-2 mb-4 rounded" />
          <input type="text" name="numriTelefonit" value={lexuesiData.numriTelefonit} onChange={handleInputChange} placeholder="Numri Telefonit" className="w-full border border-gray-300 px-4 py-2 mb-4 rounded" />
          <select name="bibloteka" value={lexuesiData.bibloteka} onChange={handleInputChange} className="w-full border border-gray-300 px-4 py-2 mb-4 rounded">
            <option value="Pejë">Pejë</option>
            <option value="Vushtrri">Vushtrri</option>
            <option value="Prizren">Prizren</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">{isEditing ? 'Edit' : 'Add'}</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Lexuesi;

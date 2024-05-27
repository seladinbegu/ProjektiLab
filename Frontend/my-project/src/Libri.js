import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';

const Libri = () => {
  const [libriData, setLibriData] = useState({
    id: '',
    titulli: '',
    autori: '',
    pika: '',
    burimi: '',
    statusi: ''
  });

  const [libriList, setLibriList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLibriList();
  }, []);

  const fetchLibriList = async () => {
    try {
      const response = await fetch('http://localhost:5132/api/Libri');
      const data = await response.json();
      setLibriList(data);
    } catch (error) {
      console.error('Error fetching libri list:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibriData({ ...libriData, [name]: value });
  };

  const handleEdit = (libri) => {
    setLibriData({ ...libri });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        
        await fetch(`http://localhost:5132/api/Libri/${libriData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(libriData)
        });
      } else {
       
        await fetch('http://localhost:5132/api/Libri', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(libriData)
        });
      }
      fetchLibriList();
      setLibriData({ id: '', titulli: '', autori: '', pika: '', burimi: '', statusi: '' });
      setIsEditing(false); 
    } catch (error) {
      console.error('Error creating/updating libri:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5132/api/Libri/${id}`, {
        method: 'DELETE'
      });
      fetchLibriList();
    } catch (error) {
      console.error('Error deleting libri:', error);
    }
  };

  return (
    <>
    <Header></Header>
    <div style={{ textAlign: 'center', minHeight: '100vh', padding: '1rem', paddingBottom: '10rem' }}>
      <div style={{ margin: '0 auto', padding: '1rem'}}>
        <form onSubmit={handleSubmit} className="mb-4" style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            name="titulli"
            value={libriData.titulli}
            onChange={handleInputChange}
            placeholder="Titulli"
            className="border rounded px-4 py-2 mb-2"
          />
          <input
            type="text"
            name="autori"
            value={libriData.autori}
            onChange={handleInputChange}
            placeholder="Autori"
            className="border rounded px-4 py-2 mb-2"
          />
          <input
            type="text"
            name="pika"
            value={libriData.pika}
            onChange={handleInputChange}
            placeholder="Pika"
            className="border rounded px-4 py-2 mb-2"
          />
          <input
            type="file"
            name="burimi"
            value={libriData.burimi}
            onChange={handleInputChange}
            placeholder="Burimi (URL for Image)"
            className="border rounded px-4 py-2 mb-2"
          />
          <input
            type="text"
            name="statusi"
            value={libriData.statusi}
            onChange={handleInputChange}
            placeholder="Statusi"
            className="border rounded px-4 py-2 mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '3rem' }}>
          {libriList.map((libri) => (
            <div key={libri.id} style={{ border: '1px solid #ccc', borderRadius: '0.5rem', padding: '2rem', position: 'relative' }}>
              <img src={`http://localhost:5132${libri.burimi}`} alt="Book Cover" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem' }} />
              <div style={{ position: 'absolute', bottom: '-2.3rem', width: '100%', left: '0', display: 'flex', justifyContent: 'space-evenly' }}>
                <button
                  onClick={() => handleEdit(libri)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  style={{ marginRight: '0.5rem', }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(libri.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  style={{ marginRight: '0.5rem', }}
                >
                  Delete
                </button>
              </div>
              <div>
                <span style={{ marginRight: '0.5rem' }}>{libri.titulli}</span>
                <span style={{ marginRight: '0.5rem' }}>{libri.autori}</span>
                <span>{libri.pika}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Libri;
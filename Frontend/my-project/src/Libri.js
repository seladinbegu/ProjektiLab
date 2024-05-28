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
    statusi: null // Default status
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
          body: JSON.stringify({ ...libriData, statusi: null }) // Default status on create
        });
      }
      fetchLibriList();
      setLibriData({ id: '', titulli: '', autori: '', pika: '', burimi: '', statusi: null });
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating/updating libri:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("A dëshironi të fshini librin në fjalë?")) {
        await fetch(`http://localhost:5132/api/Libri/${id}`, {
          method: 'DELETE'
        });
        fetchLibriList();
      }
    } catch (error) {
      console.error('Error deleting libri:', error);
    }
  };

  const handleOrder = async (id) => {
    try {
      const updatedStatus = 'Rezervuar'; // Temporary status for 5 seconds
      await fetch(`http://localhost:5132/api/Libri/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ op: "replace", path: "/statusi", value: updatedStatus }])
      });
      fetchLibriList();
  
      setTimeout(async () => {
        try {
          await fetch(`http://localhost:5132/api/Libri/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ op: "replace", path: "/statusi", value: null }])
          });
          fetchLibriList();
        } catch (error) {
          console.error('Error resetting libri status:', error);
        }
      }, 5000);
    } catch (error) {
      console.error('Error ordering libri:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === "I Lirë" ? "text-green-500" : "text-red-500";
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', minHeight: '100vh', padding: '1rem', paddingBottom: '10rem' }}>
        <div style={{ margin: '0 auto', padding: '1rem' }}>
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
            <select
              name="pika"
              value={libriData.pika}
              onChange={handleInputChange}
              className="border rounded px-4 py-2 mb-2"
            >
              <option value="" disabled>Pika</option>
              <option value="Pejë">Pejë</option>
              <option value="Vushtrri">Vushtrri</option>
              <option value="Prizren">Prizren</option>
            </select>
            <input
              type="text"
              name="burimi"
              value={libriData.burimi}
              onChange={handleInputChange}
              placeholder="Burimi (URL for Image)"
              className="border rounded px-4 py-2 mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {isEditing ? 'Përmirëso' : 'Shto'}
            </button>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '3rem' }}>
            {libriList.map((libri) => (
              <div
                key={libri.id}
                className="relative border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-96"
              >
                <img
                  src={libri.burimi}
                  alt="Book Cover"
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 flex justify-around py-2 rounded-b-lg shadow-md">
                  <button
                    onClick={() => handleEdit(libri)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                  >
                    Përmirëso
                  </button>
                  <button
                    onClick={() => handleDelete(libri.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                  >
                    Fshijë
                  </button>
                  <button
                    onClick={() => handleOrder(libri.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                    disabled={libri.statusi !== null && libri.statusi !== 'I Lirë'}
                  >
                    {libri.statusi === null || libri.statusi === 'I Lirë' ? 'Rezervo' : 'Libri i rezervuar'}
                  </button>
                </div>
                <div className="mt-4 text-center space-y-2">
                  <h3 className="text-lg font-bold text-blue-900">{libri.titulli}</h3>
                  <p className="text-sm text-gray-700 font-medium">{libri.autori}</p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-500 font-semibold">
                    <span>{libri.pika}</span>
                    <span className={getStatusColor(libri.statusi)}>{libri.statusi === null ? 'I Lirë' : libri.statusi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Libri;

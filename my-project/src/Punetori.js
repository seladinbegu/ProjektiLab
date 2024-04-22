import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Punetori = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [newPunetori, setNewPunetori] = useState({});
  const [selectedPika, setSelectedPika] = useState('');

  const fetchPunetoret = async () => {
    try {
      const response = await fetch('http://localhost:5024/api/Punetori');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      const data = await response.json();
      setPunetoret(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addPunetori = async () => {
    try {
      const response = await fetch('http://localhost:5024/api/Punetori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newPunetori, biblotekaPika: selectedPika })
      });
      if (!response.ok) {
        throw new Error('Failed to add punetori');
      }
      fetchPunetoret(); // Refresh the punetoret list
    } catch (error) {
      console.error('Error adding punetori:', error);
    }
  };

  useEffect(() => {
    fetchPunetoret();
  }, []);

  return (
    <>
      <Header />
      <div className="h-80 overflow-y-auto">
        <h2 className="text-2xl mb-4 text-center font-bold">Fetched Punetoret</h2>
        <div className="mx-auto max-w-lg">
          {punetoret.map(p => (
            <div key={p.iD_Punetori} className="border border-gray-300 p-4 mb-4 rounded-md">
              <p><strong>Emri:</strong> {p.emri}</p>
              <p><strong>Mbarimi i Kontrates:</strong> {p.mbarimi_iKontrates}</p>
              <p><strong>Pozita:</strong> {p.pozita}</p>
              <p><strong>Pika:</strong> {p.biblotekaPika}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-lg mt-8">
        <h2 className="text-2xl mb-4 text-center font-bold">Add New Punetori</h2>
        <form className="flex flex-col" onSubmit={e => { e.preventDefault(); addPunetori(); }}>
          <input className="border border-gray-300 rounded-md p-2 mb-2" type="text" placeholder="Emri" onChange={e => setNewPunetori({ ...newPunetori, emri: e.target.value })} />
          <input className="border border-gray-300 rounded-md p-2 mb-2" type="date" placeholder="Mbarimi i Kontrates" onChange={e => setNewPunetori({ ...newPunetori, mbarimi_iKontrates: e.target.value })} />
          <input className="border border-gray-300 rounded-md p-2 mb-2" type="text" placeholder="Pozicioni" onChange={e => setNewPunetori({ ...newPunetori, pozita: e.target.value })} />
          <select className="border border-gray-300 rounded-md p-2 mb-2" value={selectedPika} onChange={e => setSelectedPika(e.target.value)}>
            <option value="">Select Pika</option>
            <option value="Pejë">Pejë</option>
            <option value="Vushtrri">Vushtrri</option>
            <option value="Prizren">Prizren</option>
          </select>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">Add Punetori</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Punetori;

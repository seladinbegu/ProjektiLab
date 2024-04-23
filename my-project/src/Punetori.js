import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Punetori = () => {
  const [punetoret, setPunetoret] = useState([]);
  const [newPunetori, setNewPunetori] = useState({ emri: '', mbarimi_iKontrates: '', pozita: '', biblotekaPika: '' });
  const [selectedPika, setSelectedPika] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Function to fetch punetoret from the server
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

  // Function to add a new punetori
  const addPunetori = async () => {
    try {
      const response = await fetch('http://localhost:5024/api/Punetori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPunetori)
      });
      if (!response.ok) {
        throw new Error('Failed to add punetori');
      }
      fetchPunetoret(); // Refresh the punetoret list
      setNewPunetori({ emri: '', mbarimi_iKontrates: '', pozita: '', biblotekaPika: '' }); // Reset the form fields
    } catch (error) {
      console.error('Error adding punetori:', error);
    }
  };

  useEffect(() => {
    fetchPunetoret();
  }, []);

  const deletePunetori = async (id, emri) => {
    try {
      const confirmDelete = window.confirm(`Sigurohuni përpara se të fshini punëtorin me emrin: ${emri}. A jeni të sigurt?





      `);
      if (!confirmDelete) return;

      const response = await fetch(`http://localhost:5024/api/Punetori/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete punetori');
      }

      // Filter out the deleted punetori from the state
      setPunetoret(prevPunetoret => prevPunetoret.filter(punetori => punetori.id !== id));
    } catch (error) {
      console.error('Error deleting punetori:', error);
    }
  };

  // Function to update a punetori
 // Function to update a punetori
const updatePunetori = async () => {
  try {
    const response = await fetch(`http://localhost:5024/api/Punetori/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPunetori)
    });
    if (!response.ok) {
      throw new Error('Failed to update punetori');
    }

    // Log the response from the server
    console.log('Update response:', response);

    // Update the punetori in the state array
    setPunetoret(prevPunetoret => {
      return prevPunetoret.map(punetor => {
        if (punetor.id === editingId) {
          return { ...punetor, ...newPunetori };
        }
        return punetor;
      });
    });

    // Log the updated punetoret state
    console.log('Updated punetoret:', punetoret);

    setEditingId(null); // Reset the editing ID
    setNewPunetori({ emri: '', mbarimi_iKontrates: '', pozita: '', biblotekaPika: '' }); // Reset the form fields
  } catch (error) {
    console.error('Error updating punetori:', error);
  }
};


  // Function to set editing mode and populate form fields
  const editPunetori = (id) => {
    const punetorToEdit = punetoret.find(p => p.id === id);
    setEditingId(id);
    setNewPunetori({ ...punetorToEdit });
    setSelectedPika(punetorToEdit.biblotekaPika);
  };

  // Function to handle form submission for adding new punetori
  const handleSubmit = (e) => {
    e.preventDefault();
    addPunetori();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl mb-4 text-center font-bold">Punetorët Gjithsej</h2>
        <div className="overflow-y-auto max-h-96 mb-8">
          {punetoret.map(p => (
            <div key={p.id} className="flex flex-col border border-gray-300 p-4 rounded-md mb-4">
              <p><strong>Emri:</strong> {p.emri}</p>
              <p><strong>Mbarimi i Kontrates:</strong> {p.mbarimi_iKontrates}</p>
              <p><strong>Pozita:</strong> {p.pozita}</p>
              <p><strong>Pika:</strong> {p.biblotekaPika}</p>
              <div className="flex mt-2">
                <button className="mr-2 bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => editPunetori(p.id)}>Përmirëso</button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => deletePunetori(p.id, p.emri)}>Fshijë</button>
              </div>
              {editingId === p.id && (
                <form onSubmit={updatePunetori} className="mt-4">
                  <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="text" placeholder="Emri" value={newPunetori.emri} onChange={e => setNewPunetori({ ...newPunetori, emri: e.target.value })} />
                  <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="date" placeholder="Mbarimi i Kontrates" value={newPunetori.mbarimi_iKontrates} onChange={e => setNewPunetori({ ...newPunetori, mbarimi_iKontrates: e.target.value })} />
                  <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="text" placeholder="Pozicioni" value={newPunetori.pozita} onChange={e => setNewPunetori({ ...newPunetori, pozita: e.target.value })} />
                  <select className="border border-gray-300 rounded-md p-2 mb-2 w-full" value={newPunetori.biblotekaPika} onChange={e => setNewPunetori({ ...newPunetori, biblotekaPika: e.target.value })}>
                    <option value="">Pika</option>
                    <option value="Pejë">Pejë</option>
                    <option value="Vushtrri">Vushtrri</option>
                    <option value="Prizren">Prizren</option>
                  </select>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">Update</button>
                </form>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="text" placeholder="Emri" value={newPunetori.emri} onChange={e => setNewPunetori({ ...newPunetori, emri: e.target.value })} />
          <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="date" placeholder="Mbarimi i Kontrates" value={newPunetori.mbarimi_iKontrates} onChange={e => setNewPunetori({ ...newPunetori, mbarimi_iKontrates: e.target.value })} />
          <input className="border border-gray-300 rounded-md p-2 mb-2 w-full" type="text" placeholder="Pozicioni" value={newPunetori.pozita} onChange={e => setNewPunetori({ ...newPunetori, pozita: e.target.value })} />
          <select className="border border-gray-300 rounded-md p-2 mb-2 w-full" value={newPunetori.biblotekaPika} onChange={e => setNewPunetori({ ...newPunetori, biblotekaPika: e.target.value })}>
            <option value="">Pika</option>
            <option value="Pejë">Pejë</option>
            <option value="Vushtrri">Vushtrri</option>
            <option value="Prizren">Prizren</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">Shto</button>
        </form>
      </div>
      <Footer />
      {/* Add empty divs to extend page length */}
      <div style={{ height: '90px' }}></div>
    </>
  );
};

export default Punetori;

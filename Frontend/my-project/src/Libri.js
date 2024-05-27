import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { libriServiceInstance } from 'C:\\Users\\begus\\OneDrive\\Desktop\\ProjektiLab\\Frontend\\my-project\\src\\Services\\LibriService.js'; // Complete import path

const Libri = () => {
  const [libriData, setLibriData] = useState({
    id: '',
    titulli: '',
    autori: '',
    pika: '',
    burimi: null, // Updated to store file object instead of URL
    statusi: ''
  });

  const [libriList, setLibriList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLibriListAndLogBurimi = async () => {
      await fetchLibriList();
      if (libriList.length > 0) {
        console.log(libriList[0].burimi);
      }
    };
  
    fetchLibriListAndLogBurimi();
  }, []);

  const fetchLibriList = async () => {
    try {
      const data = await libriServiceInstance.getLibriList();
      setLibriList(data);
    } catch (error) {
      console.error('Error fetching libri list:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibriData({ ...libriData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLibriData({ ...libriData, burimi: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulli', libriData.titulli);
    formData.append('autori', libriData.autori);
    formData.append('pika', libriData.pika);
    formData.append('burimi', libriData.burimi);
    formData.append('statusi', libriData.statusi);
    
    try {
      await libriServiceInstance.createLibri(formData);
      fetchLibriList();
      setLibriData({ id: '', titulli: '', autori: '', pika: '', burimi: null, statusi: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating libri:', error);
    }
  };

  const handleEdit = (libri) => {
    setLibriData({ ...libri });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await libriServiceInstance.deleteLibri(id);
      fetchLibriList();
    } catch (error) {
      console.error('Error deleting libri:', error);
    }
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
            <input
              type="text"
              name="pika"
              value={libriData.pika}
              onChange={handleInputChange}
              placeholder="Pika"
              className="border rounded px-4 py-2 mb-2"
            />
            <div className="mb-2">
              <input
                type="file"
                accept="image/*" // Allow only image files
                onChange={handleFileChange}
                className="border rounded px-4 py-2"
              />
            </div>
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
                {libri.burimi ? (
                  <img
                    src={typeof libri.burimi === 'string' ? libri.burimi : URL.createObjectURL(libri.burimi)}
                    alt="Book Cover"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                    <span>No Image Available</span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '-2.3rem', width: '100%', left: '0', display: 'flex', justifyContent: 'space-evenly' }}>
                  <button onClick={() => handleEdit(libri)} className="bg-green-500 text-white px-2 py-1 rounded" style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(libri.id)} className="bg-red-500 text-white px-2 py-1 rounded" style={{ marginRight: '0.5rem' }}>Delete</button>
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
        <Footer />
      </div>
    </>
  );
};

export default Libri;

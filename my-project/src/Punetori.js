import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Punetori = () => {
  const [punetoret, setPunetoret] = useState([]);

  const fetchPunetoret = async () => {
    try {
      const response = await fetch('http://localhost:5297/api/Punetori');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPunetoret(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call fetchPunetoret when the component renders for the first time
  fetchPunetoret();

  return (
    <>
      <Header />
      <div>
        <h2>Fetched Punetoret</h2>
        <ul>
          {punetoret.map(p => (
            <li key={p.ID_Punetori}>
              Emri: {p.Emri}, Mbarimi i Kontrates: {p.Mbarimi_iKontrates}, Pozicioni: {p.Pozicioni}, BiblotekaPika: {p.BiblotekaPika}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Punetori;

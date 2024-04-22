// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
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
      console.log(data);
      setPunetoret(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchPunetoret();
  },[punetoret]);
    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  // // Call fetchPunetoret when the component renders for the first time
  // 

  return (
    <>
      <Header />
      <div>
        <h2>Fetched Punetoret</h2>
        <ul>
          {punetoret.map(p => (
            <li key={p.iD_Punetori}>
              Emri: {p.emri}, Mbarimi i Kontrates: {p.Mbarimi_iKontrates}, Pozicioni: {p.Pozicioni}, BiblotekaPika: {p.biblotekaPika}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Punetori;

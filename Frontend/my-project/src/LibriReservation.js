import React, { useState, useEffect, useCallback } from 'react';
import api from './Api'; // Ensure the path to your API module is correct
import Footer from './Footer';

const LibriReservation = ({ username, userId, email }) => {
  const [librat, setLibrat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasRecentReservation, setHasRecentReservation] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [nextReservationDate, setNextReservationDate] = useState('');
  const [pikat, setPikat] = useState([]);

  const sendReservationEmail = async (email, bookTitle, pika) => {
    try {
      const emailData = {
        to: email,
        subject: 'Rezervimi i Librit',
        body: `Përshëndetje,\n\nRezervimi i librit '${bookTitle}' në pikën '${pika}' është bërë me sukses.\n\nFaleminderit!`
      };

      await api.post('/Email', emailData);
      console.log('Email i dërguar me sukses');
    } catch (error) {
      console.error('Gabim gjatë dërgimit të emailit:', error.response ? error.response.data : error.message);
    }
  };

  const fetchPikat = useCallback(async () => {
    try {
      const response = await api.get('/Bibloteka/pikat');
      setPikat(response.data);
    } catch (error) {
      console.error('Error fetching pikat:', error);
    }
  }, []);

  const fetchLibrat = useCallback(async () => {
    try {
      const response = await api.get('/Libri');
      setLibrat(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, []);

  const fetchHasRecentReservation = useCallback(async () => {
    try {
      const response = await api.get(`/Reservation/HasRecentReservation/${userId}`);
      const hasReservation = response.data;
      setHasRecentReservation(hasReservation);

      if (hasReservation) {
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        // Format date to Albanian (e.g., "DD-MM-YYYY")
        const day = String(oneMonthLater.getDate()).padStart(2, '0');
        const month = String(oneMonthLater.getMonth() + 1).padStart(2, '0');
        const year = oneMonthLater.getFullYear();
        setNextReservationDate(`${day}-${month}-${year}`);
      }
    } catch (error) {
      console.error('Error checking recent reservations:', error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPikat();
        await fetchLibrat();
        if (userId) {
          await fetchHasRecentReservation();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, fetchLibrat, fetchHasRecentReservation, fetchPikat]);

  const handleReserve = async (libriId) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
  
    if (hasRecentReservation) {
      alert('Keni bërë një rezervim në muajin e fundit. Nuk mund të bëni një tjetër deri në muajin tjetër.');
      return;
    }
  
    const reservationData = {
      userId: userId,
      libriId: libriId,
      reservationDate: new Date().toISOString()
    };
  
    try {
      const response = await api.post('/Reservation', reservationData);
  
      if (response.status === 201) {
        console.log('Rezervimi i suksesshëm:', response.data);
        setReservationSuccess(true);
  
        // Update the book status locally
        setLibrat(prevLibrat =>
          prevLibrat.map(liber =>
            liber.id === libriId ? { ...liber, statusi: 'I Zënë' } : liber
          )
        );
  
        // Get book details for email
        const bookResponse = await api.get(`/Libri/${libriId}`);
        const bookTitle = bookResponse.data.titulli;
  
        // Send email
        await sendReservationEmail(email, bookTitle, getPikaName(bookResponse.data.biblotekaId));
  
        // Update reservation status
        await fetchHasRecentReservation();
      } else {
        console.error('Dështimi për të rezervuar librin:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Gabim gjatë rezervimit të librit:', error.response ? error.response.data : error.message);
    }
  };

  const getPikaName = (id) => {
    if (!id) {
      return 'Unknown';
    }
    const pika = pikat.find(pika => pika.id === id);
    return pika ? pika.pika : 'Unknown';
  };

  if (loading) {
    return <div>Ngarkimi...</div>;
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto mb-14">
      <div className="container mx-auto mt-8 max-w-4xl mb-8 p-4 bg-white shadow-lg rounded-lg">
        {hasRecentReservation && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Kufizimi i Rezervimit</h3>
            <p className="mt-2">
              Nuk mund të rezervoni një libër deri më <span className="font-bold">{nextReservationDate}</span>.
            </p>
          </div>
        )}
        {reservationSuccess && (
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Rezervimi i Suksesshëm</h3>
            <p className="mt-2">
              Rezervimi është bërë me sukses. Ju do të merrni një email me detajet.
            </p>
          </div>
        )}
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight shadow-md shadow-blue-500/30 mb-4">
          Rezervo Librat
        </h2>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Librat e Disponueshëm</h3>
          <div className="flex flex-wrap gap-4">
  {librat.map((liber) => (
    <div key={liber.id} className="flex flex-col items-center border p-4 rounded-lg shadow-md bg-white w-72">
      <div className="relative w-full h-48 mb-4">
        <img
          src={liber.burimi || 'default-image-url.png'}
          alt={liber.titulli || 'Nuk ka Titull'}
          className="w-full h-full object-cover rounded-md border-2 border-gray-300"
          onError={(e) => e.target.src = 'default-image-url.png'}
        />
      </div>
      <h4 className="text-lg font-semibold text-center mb-2 text-gray-900 font-extrabold shadow-md shadow-blue-500/50 bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-lg">
        {liber.titulli}
      </h4>
      <p className="text-gray-700 text-center">
        Autori: <span className="font-bold">{liber.autori}</span>
      </p>
      <p className="text-gray-700 text-center">
        Pika: {getPikaName(liber.biblotekaId)}
      </p>
      <p className={`text-center font-semibold ${liber.statusi === 'I Lirë' ? 'text-green-500' : 'text-red-500'}`}>
        Statusi: {liber.statusi}
      </p>
      {liber.statusi === 'I Lirë' && (
        <button
          onClick={() => handleReserve(liber.id)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Rezervo
        </button>
      )}
    </div>
  ))}
</div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LibriReservation;

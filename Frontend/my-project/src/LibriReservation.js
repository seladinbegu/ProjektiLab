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
        body: `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                    .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.9em; }
                    .content { padding: 20px; }
                    .highlight { font-weight: bold; color: #333; }
                    .warning { color: red; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">

                    <h1>Konfirmimi i Rezervimit</h1>
                </div>
                <div class="content">
                    <p>Përshëndetje,</p>
                    <p>Na vjen mirë t'ju informojmë se rezervimi i librit <span class="highlight">'${bookTitle}'</span> në pikën <span class="highlight">'${pika}'</span> është bërë me sukses.</p>
                    <p>Ju lutemi, kontrolloni informacionet e rezervimit më poshtë:</p>
                    <ul>
                        <li><strong>Libri:</strong> ${bookTitle},</li>
                        <li><strong>Pika:</strong> ${pika},</li>
                        <li><strong>Data e Rezervimit:</strong> ${new Date().toLocaleDateString()},</li>
                        <li><strong>Data e Kthimit:</strong> ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</li>
                    </ul>
                    <p>Faleminderit që zgjodhët shërbimet tona! Ju lutemi, mos harroni të ktheni librin brenda kohës së cekur më lartë.</p>
                    <p class="warning">P.S. Nëse nuk paraqiteni fizikisht në pikën Inposition Library - ${pika} brenda 48 orëve, rezervimi do të anulohet.</p>
                </div>
                <div class="footer">
                    <p>Me respekt,<br>Inposition Library</p>
                </div>
            </body>
        </html>
    `
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
      window.location.href = '/login'; // Redirect to login page
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
    return <div className="text-center mt-10">Ngarkimi...</div>;
  }

  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto mb-14 px-4 md:px-0">
        <div className="container mx-auto mt-8 max-w-7xl mb-8 p-4 bg-white shadow-lg rounded-lg">
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
                <div
                  key={liber.id}
                  className={`flex flex-col items-center border p-4 rounded-lg shadow-md bg-white w-full sm:w-72 transition-transform duration-500 ease-in-out
                    ${liber.statusi === 'I Zënë' ? 'hover:bg-red-200 hover:animate-tiltZ' : 'hover:bg-green-200 hover:scale-105'}`}
                >
                  <div className="relative w-full h-48 mb-4">
                  <img
                      src={liber.burimi || 'default-image-url.png'}
                      alt={liber.titulli || 'Nuk ka Titull'}
                      className="absolute inset-0 w-full h-full object-contain rounded-md border-2 border-gray-300"
                      onError={(e) => e.target.src = 'default-image-url.png'}
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2 text-gray-900 font-extrabold shadow-md shadow-blue-500/50 bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-lg">
                    {liber.titulli}
                  </h4>
                  <p className="text-blue-600 text-center md:text-left font-medium italic tracking-wide shadow-sm hover:text-blue-700 transition duration-300 ease-in-out">
  {liber.autori}
</p>

                  <p className="text-gray-700 text-center">
                    Pika: <strong>{getPikaName(liber.biblotekaId)}</strong>
                  </p>
                  <p className={`text-center font-semibold ${liber.statusi === 'I Lirë' ? 'text-green-500' : 'text-red-500'}`}>
                    Statusi: {liber.statusi}
                  </p>
                  {liber.statusi === 'I Lirë' && (
                    <button
                      onClick={() => handleReserve(liber.id)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      Rezervo
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibriReservation;

import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';


const LibriReservation = ({ loggedInUsername, userEmail }) => {
    const [libriList, setLibriList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPika, setSelectedPika] = useState('');
    const [searchTermTitulli, setSearchTermTitulli] = useState('');
    const [searchTermAutori, setSearchTermAutori] = useState('');
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        fetchLibri();
    }, []);

    const fetchLibri = async () => {
        try {
            const response = await fetch('http://localhost:5132/api/Libri');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setLibriList(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching libri:', error);
            setLoading(false);
        }
    };

    const handleReserve = async (id, title, pika) => {
        if (!loggedInUsername) {
            navigate('/login');
            return;
        }

        try {
            const book = libriList.find(libri => libri.id === id);
            if (!book) {
                console.error(`Book with ID ${id} not found.`);
                return;
            }

            const updatedBook = { ...book, statusi: 'I Zënë' };
            await fetch(`http://localhost:5132/api/Libri/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBook)
            });

            const updatedLibriList = libriList.map(libri => {
                if (libri.id === id) {
                    return updatedBook;
                }
                return libri;
            });
            setLibriList(updatedLibriList);

            await sendEmail(title, pika, userEmail);
            alert('Rezervimi i librit u krye me sukses.');
        } catch (error) {
            console.error('Error reserving book:', error);
        }
    };

    const sendEmail = async (bookTitle, pika, userEmail) => {
        try {
            console.log('Email address:', userEmail);
            if (!emailRegex.test(userEmail)) {
                console.error('Invalid email address format');
                return;
            }
    
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(futureDate.getDate() + 30);
    
            // Manually construct the date string in Albanian
            const months = [
                'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
                'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
            ];
            const formattedDate = `${futureDate.getDate()} ${months[futureDate.getMonth()]} ${futureDate.getFullYear()}`;
            const today2 = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    
            const userBody = `
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  color: #333;
                }
                .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .header {
                  color: #007BFF;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                .content {
                  margin-bottom: 15px;
                }
                .closing {
                  margin-top: 20px;
                  font-weight: bold;
                }
                .ps-message {
                  margin-top: 15px;
                  font-style: italic;
                  color: #ff0000; /* Red color */
                }
                .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">Rezervimi i Librit ${bookTitle} në pikën "${pika}"</div>
                <div class="content">
                  <p>Përshëndetje,</p>
                  <p>Libri <strong>${bookTitle}</strong> është rezervuar me sukses në pikën <strong>${pika}</strong>.</p>
                  <p>Afati i kthimit të këtij libri është deri më <strong>${formattedDate}</strong>.</p>
                </div>
                <div class="ps-message">PS: Për pranimin e librit duhet të paraqiteni fizikisht brenda <strong>48 ore</strong>, përndryshe rezervimi anulohet.</div>
                <p>Faleminderit!</p>
                <div class="closing">Me respekt,<br/>Stafi i Inposition Library</div>
                <div class="footer">
                  <p>Inposition Library</p>
                  <p>Rruga Adem Jashari, Vushtrri</p>
                  <p>42000, Vushtrri, Kosovë</p>
                  <p>Tel: +383 49 123 456</p>
                  <p>Email: inpositionlibrary@gmail.com</p>
                  <p style="margin-top: 10px; font-style: italic;">Ju lutemi mos ktheni përgjigjie në këtë email.</p>
                </div>
              </div>
            </body>
            </html>
            `;
            const adminBody = `
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  color: #333;
                }
                .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .header {
                  color: #007BFF;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                .content {
                  margin-bottom: 15px;
                }
                .closing {
                  margin-top: 20px;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">Rezervim: ${today2} | Libri: ${bookTitle}</div>
                <div class="content">
                <p>Lexuesi: <strong>${userEmail}</strong></p>
                <p>Libri: <strong>${bookTitle}</strong> | Pika: <strong>${pika}</strong></p>
                <p>Data e rezervimit: <strong>${today2}</strong></p>
                <p>Data e kthimit: <strong>${formattedDate}</strong></p>

              </div>
            </body>
            </html>
            `;
            
            

                
            const userData = {
                to: userEmail,
                subject: `Rezervimi i Librit ${bookTitle}, Pika: ${pika}`,
                body: userBody
            };
    
            const adminData = {
                to: 'beguseladin@gmail.com',
                subject: `${formattedDate} | Libri: ${bookTitle} | Lexuesi: ${userEmail}`,
                body: adminBody
            };
    
            await Promise.all([
                fetch('http://localhost:5132/api/Email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }),
                fetch('http://localhost:5132/api/Email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(adminData)
                })
            ]);
    
            console.log('Emails sent successfully');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    };
    

    const filteredLibriList = libriList.filter(libri =>
        (libri.titulli.toLowerCase().includes(searchTermTitulli.toLowerCase()) || searchTermTitulli === '') &&
        (libri.autori.toLowerCase().includes(searchTermAutori.toLowerCase()) || searchTermAutori === '') &&
        (!selectedPika || libri.pika === selectedPika)
    );

    return (
        <>
            <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <h2 className="text-3xl font-bold mb-6">Librat</h2>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
    <label htmlFor="pikaSelect" className="font-bold">Zgjedhni Pikën:</label>
    <select
        id="pikaSelect"
        value={selectedPika}
        onChange={(e) => setSelectedPika(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
    >
        <option value="">Të Gjitha Pikat</option>
        <option value="Vushtrri">Vushtrri</option>
        <option value="Pejë">Pejë</option>
        <option value="Prizren">Prizren</option>
    </select>
</div>
<div className="mb-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
    <input
        type="text"
        placeholder="Kërkoni sipas Titullit"
        value={searchTermTitulli}
        onChange={(e) => setSearchTermTitulli(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
    />
    <input
        type="text"
        placeholder="Kërkoni sipas Autorit"
        value={searchTermAutori}
        onChange={(e) => setSearchTermAutori(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
    />
</div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredLibriList.map(libri => (
                            <div key={libri.id} className="bg-white border border-gray-300 rounded-lg p-6">
                                <img src={libri.burimi} alt={libri.titulli} className="mb-4 max-h-full max-w-full" />
                                <h4 className="text-xl font-semibold mb-2 text-blue-600">{libri.titulli}</h4>
                                <p className="text-gray-700"><strong>Autori:</strong> {libri.autori}</p>
                                <p className={`text-gray-700 ${libri.statusi === 'I Lirë' ? 'text-green-600' : libri.statusi === 'I Zënë' ? 'text-red-600' : ''}`}><strong>Statusi:</strong> {libri.statusi}</p>
                                <p className="text-gray-700"><strong>Pika:</strong> {libri.pika}</p>
                                {libri.statusi === "I Lirë" && (
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            onClick={() => handleReserve(libri.id, libri.titulli, libri.pika)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        >
                                            Rezervo
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default LibriReservation;

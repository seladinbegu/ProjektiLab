import React, { useState, useEffect } from 'react';
import Footer from '../Footer';

const LibriReservation = ({ loggedInUsername, userEmail }) => {
    const [libriList, setLibriList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPika, setSelectedPika] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Define emailRegex here

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
            // Validate email address format
            if (!emailRegex.test(userEmail)) {
                console.error('Invalid email address format');
                return;
            }
    
            // Calculate the date 30 days from now
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(futureDate.getDate() + 30);
            const formattedDate = futureDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
            const userBody = `Keni rezervuar me sukses librin "${bookTitle}" në pikën "${pika}". Data e kthimit është ${formattedDate}.`;
    
            // Email data for the user
            const userData = {
                to: userEmail,
                subject: `Rezervimi i Librit "${bookTitle}", pika "${pika}"`,
                body: userBody
            };
            
    
            // Email data for beguseladin@gmail.com
            const adminData = {
                to: 'beguseladin@gmail.com',
                subject: `Rezervimi i Librit "${bookTitle}", pika "${pika}"`,
                body: `Përdoruesi ${userEmail} ka rezervuar librin "${bookTitle}" në pikën "${pika}" me datën e kthimit ${formattedDate}.`
            };
    
            // Make separate requests for each email
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
    

    return (
        <>
            <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <h2 className="text-3xl font-bold mb-6">Librat</h2>
                <div className="mb-4">
                    <label htmlFor="pikaSelect" className="mr-2 font-bold">Zgjedhni Pikën:</label>
                    <select id="pikaSelect" value={selectedPika} onChange={e => setSelectedPika(e.target.value)} className="p-2 border border-gray-300 rounded-md">
                        <option value="">Të Gjitha Pikat</option>
                        <option value="Vushtrri">Vushtrri</option>
                        <option value="Pejë">Pejë</option>
                        <option value="Prizren">Prizren</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {libriList
                            .filter(libri => !selectedPika || libri.pika === selectedPika)
                            .map(libri => (
                                <div key={libri.id} className="bg-white border border-gray-300 rounded-lg p-6">
                                    <img src={libri.burimi} alt={libri.titulli} className="mb-4 max-h-full max-w-full" />
                                    <h4 className="text-xl font-semibold mb-2 text-blue-600">{libri.titulli}</h4>
                                    <p className="text-gray-700"><strong>Autori:</strong> {libri.autori}</p>
                                    <p className={`text-gray-700 ${libri.statusi === 'I Lirë' ? 'text-green-600' : libri.statusi === 'I Zënë' ? 'text-red-600' : ''}`}><strong>Statusi:</strong> {libri.statusi}</p>
                                    <p className="text-gray-700"><strong>Pika:</strong> {libri.pika}</p>
                                    {libri.statusi === "I Lirë" && (
                                        <div className="flex justify-between items-center mt-4">
                                            <button onClick={() => handleReserve(libri.id, libri.titulli, libri.pika)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Rezervo</button>
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

import React, { useEffect, useState } from 'react';
import api from './Api'; // Ensure the path to your API module is correct
import Footer from './Footer';
import Cookies from 'js-cookie';

const ReservationsTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/Reservation/DownloadReservations', {
                    withCredentials: true ,// Ensure cookies are sent
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('AuthToken')}` // Include token in headers if necessary
                    }
                });
                console.log(response.data); // Log the response data to inspect its structure
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error.response ? error.response.data : error.message); // Log the error for debugging
                setError(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };
      
        fetchReservations();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching reservations: {error}</p>;

    if (reservations.length === 0) return <p className="text-center text-gray-500">No reservations found.</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto p-4 flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Reservations</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b">User ID</th>
                                <th className="px-4 py-2 border-b">Libri ID</th>
                                <th className="px-4 py-2 border-b">Reservation Date</th>
                                <th className="px-4 py-2 border-b">Expected Return Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{reservation.userId}</td>
                                    <td className="px-4 py-2 border-b">{reservation.libriId}</td>
                                    <td className="px-4 py-2 border-b">{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b">
                                        {(() => {
                                            const date = new Date(reservation.reservationDate);
                                            // Add one month
                                            date.setMonth(date.getMonth() + 1);
                                            return date.toLocaleDateString();
                                        })()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservationsTable;

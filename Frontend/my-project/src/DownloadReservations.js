import React, { useEffect, useState, useCallback } from 'react';
import api from './Api';
import Footer from './Footer';
import Cookies from 'js-cookie';

const ReservationsTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usernames, setUsernames] = useState({});
    const [libriTitles, setLibriTitles] = useState({});

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/Reservation/DownloadReservations', {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('AuthToken')}`
                    }
                });
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const fetchUsername = useCallback(async (userId) => {
        if (!usernames[userId]) {
            try {
                const response = await api.get(`/User/GetUserById/${userId}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('AuthToken')}`
                    }
                });
                setUsernames(prevState => ({
                    ...prevState,
                    [userId]: response.data
                }));
            } catch (error) {
                console.error(`Error fetching username for userId ${userId}:`, error);
            }
        }
    }, [usernames]);

    const fetchLibriTitle = useCallback(async (libriId) => {
        if (!libriTitles[libriId]) {
            try {
                const response = await api.get(`/Libri/GetTitulliById/${libriId}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('AuthToken')}`
                    }
                });
                setLibriTitles(prevState => ({
                    ...prevState,
                    [libriId]: response.data
                }));
            } catch (error) {
                console.error(`Error fetching libri title for libriId ${libriId}:`, error);
            }
        }
    }, [libriTitles]);

    const handleLiro = async (libriId) => {
        try {
            await api.post(`/Libri/${libriId}/liro`, {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('AuthToken')}`
                }
            });
            // Refresh the list of books after marking as available
            // Assuming fetchLibrat is a method to refresh the list
            // fetchLibrat();
        } catch (error) {
            console.error("Error marking book as available:", error);
        }
    };

    const handleDelete = async (reservationId, libriId) => {
        try {
            await api.delete(`http://localhost:5132/api/Reservation/${reservationId}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('AuthToken')}`
                }
            });
            // Mark the corresponding book as available
            await handleLiro(libriId);
            setReservations(prevReservations => 
                prevReservations.filter(reservation => reservation.id !== reservationId)
            );
        } catch (error) {
            console.error('Error deleting reservation:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (reservations.length > 0) {
            reservations.forEach(reservation => {
                fetchUsername(reservation.userId);
                fetchLibriTitle(reservation.libriId);
            });
        }
    }, [reservations, fetchUsername, fetchLibriTitle]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching reservations: {error}</p>;
    if (reservations.length === 0) return <p className="text-center text-gray-500">No reservations found.</p>;

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto p-4 flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Lisa e Rezervimeve</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b text-left">Lexuesi</th>
                                <th className="px-4 py-2 border-b text-left">Libri</th>
                                <th className="px-4 py-2 border-b text-left">Data e Rezervimit</th>
                                <th className="px-4 py-2 border-b text-left">Data e Pritjes së Kthimit</th>
                                <th className="px-4 py-2 border-b text-left">Veprime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">
                                        {usernames[reservation.userId] || 'Loading...'}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {libriTitles[reservation.libriId] || 'Loading...'}
                                    </td>
                                    <td className="px-4 py-2 border-b">{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b">
                                        {(() => {
                                            const date = new Date(reservation.reservationDate);
                                            date.setMonth(date.getMonth() + 1);
                                            return date.toLocaleDateString();
                                        })()}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() => handleDelete(reservation.id, reservation.libriId)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        >
                                            Fshijë
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                    <Footer />

        </>
    );
};

export default ReservationsTable;

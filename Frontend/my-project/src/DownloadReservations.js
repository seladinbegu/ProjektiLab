import React, { useEffect, useState, useCallback } from 'react';
import api from './Api';
import Footer from './Footer';
import Cookies from 'js-cookie';

const ReservationsTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usernames, setUsernames] = useState({}); // Store usernames
    const [libriTitles, setLibriTitles] = useState({}); // Store libri titles

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

    // Fetch username based on userId, memoized with useCallback to prevent recreation on every render
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
                    [userId]: response.data // response.data will now contain just the username
                }));
            } catch (error) {
                console.error(`Error fetching username for userId ${userId}:`, error);
            }
        }
    }, [usernames]);

    // Fetch libri title based on libriId, memoized with useCallback
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
                    [libriId]: response.data // response.data will now contain the libri title
                }));
            } catch (error) {
                console.error(`Error fetching libri title for libriId ${libriId}:`, error);
            }
        }
    }, [libriTitles]);

    useEffect(() => {
        if (reservations.length > 0) {
            reservations.forEach(reservation => {
                fetchUsername(reservation.userId); // Fetch username for each reservation's userId
                fetchLibriTitle(reservation.libriId); // Fetch libri title for each reservation's libriId
            });
        }
    }, [reservations, fetchUsername, fetchLibriTitle]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching reservations: {error}</p>;
    if (reservations.length === 0) return <p className="text-center text-gray-500">No reservations found.</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto p-4 flex-grow">
                <h1 className="text-2xl font-semibold mb-4">Lisa e Rezervimeve</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b">Lexuesi</th>
                                <th className="px-4 py-2 border-b">Libri</th>
                                <th className="px-4 py-2 border-b">Data e Rezervimit</th>
                                <th className="px-4 py-2 border-b">Data e Pritjes së Kthimit</th>
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
                                            date.setMonth(date.getMonth() + 1); // Add one month
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

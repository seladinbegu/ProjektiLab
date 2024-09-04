import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from './Api'; // Import your Axios instance

const UsersCrud = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        fetchUsers();
        console.log('AuthToken:', Cookies.get('AuthToken'));

    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/User/GetAllUsers', {
                withCredentials: true, // Ensure cookies are sent
                headers: {
                    'Authorization': `Bearer ${Cookies.get('AuthToken')}` // Include token in headers if necessary
                }
            });
            setUsersList(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/User/DeleteUser/${id}`, {
                withCredentials: true, // Ensure cookies are sent
                headers: {
                    'Authorization': `Bearer ${Cookies.get('AuthToken')}` // Include token in headers if necessary
                }
            });
            setUsersList(usersList.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <h2 className="text-3xl font-bold mb-6">Users Management</h2>
            <ul className="divide-y divide-gray-200">
                {usersList.map(user => (
                    <li key={user.id} className="py-4 flex justify-between items-center">
                        <div className="flex flex-col">
                            <h4 className="text-xl font-semibold mb-1">{user.userName}</h4>
                            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersCrud;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

const UsersCrud = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5132/api/account/users');
            setUsersList(response.data);
        } catch (error) {
            console.error('Gabim në marrjen e përdoruesve:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5132/api/account/users/${id}`);
            setUsersList(usersList.filter(user => user.id !== id));
        } catch (error) {
            console.error('Gabim gjatë fshirjes së përdoruesit:', error);
        }
    };

    return (
      <>
        <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <h2 className="text-3xl font-bold mb-6">Users</h2>
            <ul className="divide-y divide-gray-200">
                {usersList.map(user => (
                    <li key={user.id} className="py-4 flex justify-between items-center">
                        <div className="flex flex-col">
                            <h4 className="text-xl font-semibold mb-1">{user.userName}</h4>
                            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>Fjalëkalimi:</strong> {user.passwordHash}</p>
                            {user.userName === 'seladinbegu' && (
                                <p className="text-blue-500 font-semibold">ADMIN</p>
                            )}
                        </div>
                        <div className="flex items-center">
    {user.userName === 'seladinbegu' ? (
        <p className="text-blue-600 font-semibold">ADMIN</p>
    ) : (
        <button onClick={() => handleDelete(user.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete</button>
    )}
</div>

                    </li>
                ))}
            </ul>
        </div>
        <Footer />
      </>
    );
};

export default UsersCrud;

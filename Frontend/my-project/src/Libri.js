import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

const LibriCrud = () => {
    const [libriList, setLibriList] = useState([]);
    const [newLibri, setNewLibri] = useState({
        titulli: '',
        autori: '',
        burimi: '',
        statusi: '',
        pika: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    useEffect(() => {
        fetchLibri();
    }, []);

    const fetchLibri = async () => {
        try {
            const response = await axios.get('http://localhost:5132/api/Libri');
            setLibriList(response.data);
        } catch (error) {
            console.error('Error fetching libri:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLibri(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:5132/api/Libri', newLibri);
            fetchLibri();
            setNewLibri({
                titulli: '',
                autori: '',
                burimi: '',
                statusi: '',
                pika: ''
            });
        } catch (error) {
            console.error('Error creating libri:', error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:5132/api/Libri/${id}`, updatedData);
            fetchLibri();
            setIsEditing(false);
            setEditBookId(null);
            setNewLibri({
                titulli: '',
                autori: '',
                burimi: '',
                statusi: '',
                pika: ''
            });
        } catch (error) {
            console.error('Error updating libri:', error);
        }
    };

    const handleEdit = (id, book) => {
        setIsEditing(true);
        setEditBookId(id);
        setNewLibri(book);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5132/api/Libri/${id}`);
            fetchLibri();
        } catch (error) {
            console.error('Error deleting libri:', error);
        }
    };

    return (
        <>
        <div className="container mx-auto p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <h2 className="text-3xl font-bold mb-6">Libri</h2>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{isEditing ? 'Përmirëso Librin' : 'Shto Librin'}</h3>
                <div className="flex flex-wrap mb-4">
                    <input type="text" name="titulli" placeholder="Titulli" value={newLibri.titulli} onChange={handleInputChange} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 mb-2 mr-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400" />
                    <input type="text" name="autori" placeholder="Autori" value={newLibri.autori} onChange={handleInputChange} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 mb-2 mr-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400" />
                    <input type="text" name="burimi" placeholder="Image URL" value={newLibri.burimi} onChange={handleInputChange} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 mb-2 mr-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400" />
                    <select name="statusi" value={newLibri.statusi} onChange={handleInputChange} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 mb-2 mr-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400">
                    <option value="">Statusi</option>
                    <option value="I Lirë">I Lirë</option>
                    <option value="I Zënë">I Zënë</option>
                    </select>
                    <select name="pika" value={newLibri.pika} onChange={handleInputChange} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 mb-2 mr-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400">
    <option value="">Pika</option>
    <option value="Vushtrri">Vushtrri</option>
    <option value="Pejë">Pejë</option>
    <option value="Prizren">Prizren</option>
</select>

                </div>
                <button onClick={isEditing ? () => handleUpdate(editBookId, newLibri) : handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">{isEditing ? 'Përmirëso' : 'Shto'}</button>
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-4">Libri List</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {libriList.map(libri => (
                        <div key={libri.id} className="bg-white border border-gray-300 rounded-lg p-6">
                            <img src={libri.burimi} alt={libri.titulli} className="mb-4 max-h-full max-w-full" />
                            <h4 className="text-xl font-semibold mb-2 text-blue-600">{libri.titulli}</h4>
                            <p className="text-gray-700"><strong>Autori:</strong> {libri.autori}</p>
                            <p className={`text-gray-700 ${libri.statusi === 'I Lirë' ? 'text-green-600' : libri.statusi === 'I Zënë' ? 'text-red-600' : ''}`}><strong>Statusi:</strong> {libri.statusi}</p>
                            <p className="text-gray-700"><strong>Pika:</strong> {libri.pika}</p>
                            <div className="flex justify-between items-center mt-4">
                                {isEditing && editBookId === libri.id ? (
                                    <>
                                        <button onClick={() => handleUpdate(libri.id, newLibri)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:
                                        outline-none focus:bg-green-600">Ruaj</button>
                                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Anulo</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(libri.id, libri)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Përmirëso</button>
                                        <button onClick={() => handleDelete(libri.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Fshijë</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
                <Footer></Footer>

        </>
    );
};

export default LibriCrud;

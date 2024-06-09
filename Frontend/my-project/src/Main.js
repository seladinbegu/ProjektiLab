import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo2 from './images/logo2.1.png';
import Footer from './Footer';

const Main = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5132/api/Libri/random');
      setFeaturedBooks(response.data);
    } catch (error) {
      console.error('Error fetching featured books:', error);
    }
  };

  return (
    <>
    <main className="flex">
      <div className="flex-1 flex flex-col justify-center items-center">
        <img src={logo2} alt="Inposition Library Logo" className="w-full mt-0.5 mb-0.5" />

        <section className="container mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBooks.map(book => (
              <Link key={book.id} to={`/librireservation`}>
                <div className="bg-white shadow-md rounded-lg p-3 hover:bg-gray-200 duration-200 ease-in-out">
                  <img src={book.burimi} alt="Book Cover" className="w-1/2 mx-auto" />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">{book.titulli}</h3>
                    <p className="text-blue-600">{book.autori}</p>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
    <Footer></Footer>
    </>
  );
};

export default Main;

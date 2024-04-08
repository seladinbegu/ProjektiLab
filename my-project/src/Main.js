import React from 'react';
import logo2 from './images/logo2.1.png';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <main className="flex">
      <div className="flex-1 flex flex-col justify-center items-center">
        <img src={logo2} alt="Inposition Library Logo" className="w-full mt-0.5 mb-0.5" />


        <section className="container mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-4">Featured Books</h2>
          {/* Featured Books Section */}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">



            {/* Sample Book Card */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="https://via.placeholder.com/150" alt="Book Cover" className="w-full" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Gjenerali i Ushtrisë së Vdekur</h3>
                <p className="text-gray-600">Ismail Kadare</p>
                <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* Repeat the sample book card for other featured books */}




          </div>



        </section>



        {/* Call-to-Action Button */}
        <button className="mt-8 bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out">Explore More</button>
      </div>
      <div></div>
    </main>
  );
};

export default Main;

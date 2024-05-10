import React from 'react';
import logo2 from './images/logo2.1.png';
import gjeneraliishtrisesevdekur from './images/libratfoto/gjeneraliishtrisesevdekur.jpg'
import babatomori from './images/libratfoto/babatomori.jpg'

const Main = () => {
  return (
    <main className="flex">
      <div className="flex-1 flex flex-col justify-center items-center">
        <img src={logo2} alt="Inposition Library Logo" className="w-full mt-0.5 mb-0.5" />

        <section className="container mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-4">Libra të disponueshëm</h2>

          {/* Featured Books Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sample Book Card */}
            <div className="bg-white shadow-md rounded-lg p-3 hover:bg-gray-200 duration-200 ease-in-out">
              <img src={gjeneraliishtrisesevdekur} alt="Book Cover" className="w-1/2 mx-auto" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Gjenerali i Ushtrisë së Vdekur</h3>
                <p className="text-blue-600">Ismail Kadare</p>
                <p className="mt-2">
                  Statusi: 
                  <span className="text-green-600 font-bold italic"> I Lirë</span>
                </p>
              </div>
            </div>


            <div className="bg-white shadow-md rounded-lg p-3 hover:bg-gray-200 duration-200 ease-in-out">
              <img src={babatomori} alt="Book Cover" className="w-1/2 mx-auto" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Baba Tomori</h3>
                <p className="text-blue-600">Andon Zako Çajupi</p>
                <p>Statusi: <span className="text-red-600 font-bold italic"> I Zënë deri më: 25/04/2024</span></p>
              </div>
            </div>



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

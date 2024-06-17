import React from 'react';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <>
    <div className="bg-blue-100 text-gray-800">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-lg">Mësoni më shumë për Inposition Library, misionin, vizionin dhe ekipin tonë.</p>
        </div>
      </div>

      {/* Library Overview */}
      <div className="container mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold mb-6">Përmbledhje</h2>
        <p className="text-lg mb-6">
          Mirë se vini në Bibliotekën Inposition! Ne kemi shërbyer komunitetit për mbi 20 vjet, duke ofruar qasje në një koleksion të madh librash, burime dixhitale dhe programe komunitare. Qëllimi ynë është të nxisim dashurinë për lexim dhe të mësuarit gjatë gjithë jetës në një ambient mikpritës dhe gjithëpërfshirës.
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="bg-white py-16 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Misioni Ynë</h2>
            <p className="text-lg">
              Misioni ynë është të fuqizojmë komunitetin përmes qasjes së lirë në informacion, edukim dhe pasurim kulturor. Ne përpiqemi të jemi një gur themeli i njohurive dhe të mësuarit, duke mbështetur individët në ndjekjen e rritjes së tyre personale dhe profesionale.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Vizioni Ynë</h2>
            <p className="text-lg">
              Vizioni ynë është të jemi një qendër dinamike për komunitetin, ku njerëzit e të gjitha moshave dhe prejardhjeve mund të mblidhen për të mësuar, zbuluar dhe lidhur. Ne synojmë të frymëzojmë dhe mbështesim një dashuri gjatë gjithë jetës për lexim dhe të mësuarit, duke u përshtatur me nevojat në ndryshim të përdoruesve tanë.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Njihuni me Ekipin Tonë</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <img src="https://www.aragon.ai/_next/image?url=%2Fimages%2Fheadshots%2Fexample-1-output.jpg&w=640&q=70" alt="Zana Krasniqi" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">Zana Krasniqi</h3>
            <p className="text-blue-600">Drejtoreshë e Bibliotekës</p>
            <p className="mt-4">
              Zana ka udhëhequr Bibliotekën Inposition për 10 vitet e fundit, me fokus në zgjerimin e shtrirjes së komunitetit dhe përmirësimin e shërbimeve të bibliotekës.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <img src="https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg" alt="Agron Ademi" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">Agron Ademi</h3>
            <p className="text-blue-600">Menaxher</p>
            <p className="mt-4">
              Agroni ka mbi 15 vite përvojë në menaxhimin e bibliotekave dhe është i apasionuar pas burimeve dixhitale dhe programeve komunitare.
            </p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <img src="https://www.aragon.ai/_next/image?url=%2Fimages%2Fheadshots%2Fexample-7-output.jpeg&w=640&q=70" alt="Arbenita Berisha" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">Arbenita Berisha</h3>
            <p className="text-blue-600">Koordinatore e Shërbimeve për Rininë</p>
            <p className="mt-4">
              Arbenita specializohet në programimin për fëmijë dhe iniciativat e leximit, duke sjellë kreativitet dhe entuziazëm në shërbimet tona për të rinjtë.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AboutUs;

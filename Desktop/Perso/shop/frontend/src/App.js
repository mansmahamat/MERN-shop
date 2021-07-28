import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-4">
        <h1 className="text-green-400 text-2xl">Welcome to PlantShop </h1>
      </main>
      <Footer />
    </>
  );
}

export default App;

import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-4">
        <HomeScreen />
      </main>
      <Footer />
    </>
  );
}

export default App;

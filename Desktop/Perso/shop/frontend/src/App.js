import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto py-4">
        <Route path="/" component={HomeScreen} exact />
        <Route path="/plant/:id" component={ProductScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;

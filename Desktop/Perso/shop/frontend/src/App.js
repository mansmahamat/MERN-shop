import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreens';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto py-4">
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/plant/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;

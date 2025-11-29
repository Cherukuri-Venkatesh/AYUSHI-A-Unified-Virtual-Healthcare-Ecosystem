import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Prescriptions from './pages/Prescriptions';
import Orders from './pages/Orders';
import OrderStatus from './pages/OrderStatus';
import Login from './pages/Login';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app-container">
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
 <Footer />
    </div>
  );
};

export default App;

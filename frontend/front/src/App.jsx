import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Delete from './components/AdminProducts/ProductList';
import Add from './components/AdminProducts/AddProduct';
import Admin from './components/AdminProducts/AdminDashBoard';
import ProductPage from './components/ProductPage';
import About from './components/About'
import Footer from './components/Footer'
import Cart from './components/Cart'
// import AppRoutes  from './components/AppRoutes';
function App() {
  return (
    <Router className=".body">
      <Navbar />
      <div>
        <Routes>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

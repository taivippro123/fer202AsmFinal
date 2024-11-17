import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Add from './components/Add';
import ProductDetails from './components/ProductDetails';
import ManageProduct from './components/ManageProduct';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<Add />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/manage" element={<ManageProduct />} />
      </Routes>
    </Router>
  );
};

export default App;

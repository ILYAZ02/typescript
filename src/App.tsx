import React from 'react';
import { Routes, Route, } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import { ModalContext } from './Context';
import Product from './pages/Product';
import Params from './pages/Params';
import Cart from './pages/Cart';
function App() {
  return (
    <div className="App">
      <div className="Apps">
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product/>} />
          <Route path='/params/:id' element={<Params/>} />
          <Route path='/cart' element={<Cart/>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;

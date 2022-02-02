import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
// pages for this product
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';
import AboutUs from './views/AboutUs';
//import AppLayout from './views/Layout/AppLayout.js';

render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/aboutus' element={<AboutUs />} />
      
      <Route path='*' element={<Error />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);

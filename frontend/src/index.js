import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages for this product
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';

render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);

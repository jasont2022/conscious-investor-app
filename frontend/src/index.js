import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './views/theme.css';

// pages for this product
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';
import AboutUs from './views/DashHome';
import Recommendation from './views/Recommendation';
//import AppLayout from './views/Layout/AppLayout.js';
import Search from './views/Search';
import {SettingComp as Settings} from './views/Settings';


render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/aboutus' element={<AboutUs />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/search' element={<Search />} />
      <Route path='/recommendation' element={<Recommendation />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages for this product
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';
import Search from './views/Search';
import Recommendation from './views/Recommendation';
import {SettingComp as Settings} from './views/Settings';

render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Error />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/search' element={<Search />} />
      <Route path='/recommendation' element={<Recommendation />} />
    </Routes>
  </Router>,
  document.getElementById('root'),
);

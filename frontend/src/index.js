import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './views/theme.css';

// pages for this product
import Home from './views/Home';
import Error from './views/Error';
import Register from './views/Register';
import Login from './views/Login';
import DashHome from './views/DashHome';
import AboutUs from './views/AboutUs';
import Recommendation from './views/Recommendation';
//import AppLayout from './views/Layout/AppLayout.js';
import Search from './views/Search';
import { SettingComp as Settings } from './views/Settings';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Company from './views/Company';

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      const { data: { username } } = await axios.get('/account/user')
      username ? userHasAuthenticated(true) : userHasAuthenticated(false)
      console.log(isAuthenticated)
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Settings /> : <Login />} />
        <Route path='/dashboard' element={isAuthenticated ? <DashHome /> : <Login />} />
        <Route path='/register' element={!isAuthenticated ? <Register /> : <Settings />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Settings />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/search' element={isAuthenticated ? <Search /> : <Login />} />
        <Route path='/recommendation' element={isAuthenticated ? <Recommendation /> : <Login />} />
        <Route path='/company/:tick' element={isAuthenticated ? <Company /> :  <Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

render(
  <App />,
  document.getElementById('root'),
);

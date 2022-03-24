import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavbarC';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import 'boxicons/css/boxicons.min.css';
import './aboutus.css'; 


// add more props to Navbar see Navbar.js
const AboutUs = () => {
  const navigate = useNavigate;
  const [activeUser, setActiveUser] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect

  // reload the page based on active user
  useEffect(() => {
    const getUser = async () => {
      try {
        // might need more than username, get profile picture
        const { data: { username } } = await axios.get('/account/user')
        username ? setActiveUser(username) : setActiveUser('')
        console.log(username)
      } catch (err) {
        setActiveUser('')
        navigate('/')
      }
    }
    getUser()
  }, [count])

  return (
    <div>
      <style>{'body { background-color: lightgray; padding: 0px 0px 0px 320px }'}</style>

      <Sidebar />
      <Outlet />

      <div className='about-section'>
        <div className='inner-container'>
          <h1>About Us</h1>
          <p className='text'>
            LOREM IPSEM MORE
          </p>
        </div>
      </div>
      
      
    </div>
  );
};

export default AboutUs;

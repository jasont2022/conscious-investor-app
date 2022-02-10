import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavbarC';

const Company = () => {
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
    <>
      <h1>Hello World</h1>
      <Navbar
        user={activeUser}
        count={count}
        setCount={setCount}
      />
    </>

  );
}

export default Company;
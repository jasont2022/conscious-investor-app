import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from 'styled-components';
import Navbar from '../NavbarC';

// 2. set up functionality -> states, useEffect, api calls, etc.
// 3. display the component
const Company = () => {
  const navigate = useNavigate();
  const { tick } = useParams();
  const [activeUser, setActiveUser] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect
  const [data, setData] = useState({}) // get company info
  const [esgInfo, setEsgInfo] = useState({}) // get esg info 

  // reload the page based on active user
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { username } } = await axios.get('/account/user')
        username ? setActiveUser(username) : setActiveUser('')
      } catch (err) {
        setActiveUser('')
        navigate('/')
      }
    }
    getUser()
  }, [count])

  // get company info for the specific ticker
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${tick}?apikey=e605026ed16aae3b084c6297f09bba6c`)
        const { data: esg } = await axios.get(`/account/esg/${tick}`)
        console.log(data)
        setData(data[0])
        console.log(esg)
      } catch (err) {
        // TODO: handle errors
        console.log(err)
      }
    }
    getCompanyInfo()
  }, [])

  return (
    <>
      <Navbar
        user={activeUser}
        count={count}
        setCount={setCount}
      />
      <div>
        <h1>{tick}</h1>
      </div>
    </>
  );
}

export default Company;
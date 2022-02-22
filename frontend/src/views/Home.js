import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavbarC';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import 'boxicons/css/boxicons.min.css';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';




import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';






const columns = [
  { field: 'id', headerName: 'Ticker', width: 90 },
  {
    field: 'logo',
    headerName: 'Logo',
    width: 80,
    editable: true,
    renderCell: (params) => (
      <strong>
        <Avatar alt="Remy Sharp" src={`${params.value}`} />
      </strong>
    )
  },
  {
    field: 'companyName',
    headerName: 'Company name',
    width: 300,
    editable: true,
  },
  {
    field: 'industry',
    headerName: 'Industry',
    width: 200,
    editable: true,
  },
  {
    field: 'marketCap',
    headerName: 'Market Cap (millions)',
    width: 200,
    editable: true,
  },
  {
    field: 'esg',
    headerName: 'ESG',
    width: 200,
    editable: true,
  }
];


const financial_columns = [
  { field: 'id', headerName: 'Ticker', width: 90 },
  {
    field: 'logo',
    headerName: 'Logo',
    width: 80,
    editable: true,
    renderCell: (params) => (
      <strong>
        <Avatar alt="Remy Sharp" src={`${params.value}`} />
      </strong>
    )
  },
  {
    field: 'companyName',
    headerName: 'Company name',
    width: 300,
    editable: true,
  },
  {
    field: 'industry',
    headerName: 'Industry',
    width: 200,
    editable: true,
  },
  {
    field: 'marketCap',
    headerName: 'Market Cap (millions)',
    width: 200,
    editable: true,
  },
  {
    field: 'excess_return',
    headerName: 'Excess Return (millions)',
    width: 200,
    editable: true,
  }
];



// add more props to Navbar see Navbar.js
const Home = () => {
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
      <Navbar
        user={activeUser}
        count={count}
        setCount={setCount}
      />

      <Sidebar />
      <Outlet />
      
      {activeUser ? (<h1>Hello {activeUser} </h1> ): (<h1>Not logged In</h1>)}



     



      



    

    </div>
  );
};

export default Home;

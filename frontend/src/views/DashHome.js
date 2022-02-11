import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavbarC';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import 'boxicons/css/boxicons.min.css';
import Table from '../components/Table/Table';
import { Link } from 'react-router-dom'


const latestOrders = {
  header: [
    "order id",
    "user",
    "total price",
    "date",
    "status"
  ],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping"
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid"
    }

  ]
}

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>

  </tr>
)



// add more props to Navbar see Navbar.js
const Dashbaord = () => {
  const navigate = useNavigate();
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
      <div className="col-8">
        <div className="card">
          <div className="card__header">
            <h3>latest orders</h3>
          </div>
          <div className="card__body">
            <Table
              headData={latestOrders.header}
              renderHead={(item, index) => renderOrderHead(item, index)}
              bodyData={latestOrders.body}
              renderBody={(item, index) => renderOrderBody(item, index)}
            />
          </div>
          <div className="card__footer">
            <Link to='/'>view all</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;

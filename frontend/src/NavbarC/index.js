import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = ({ user, count, setCount }) => {
  const navigate = useNavigate();

  // function that handles logout logic with backend
  const logout = async () => {
    try {
      const res = await axios.post('/account/logout')
      console.log(res)
      setCount(count + 1)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={require('../avox.png')} alt='logo' />
        </NavLink>

        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          {user ? (
            <NavLink to={`/${user}`} activeStyle>
              {user}
            </NavLink>
          ) : (
            <NavLink to='/register' activeStyle>
              Register
            </NavLink>
          )}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {user ? (
          <button onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <NavBtn>
            <NavBtnLink to='/login'>Login</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
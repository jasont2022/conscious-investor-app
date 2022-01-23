import React from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Button from './Button';

const NavBar = ({
  user, setErrMsg, count, setCount,
}) => {

  const logout = async () => {
    // try {
    //   const res = await axios.post('/account/logout')
    //   console.log(res)
    //   setCount(count + 1)
    //   router.push('/')
    // } catch (err) {
    //   setErrMsg(`${err}`)
    // }
  }

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      style={{ paddingTop: '15px', paddingBottom: '15px' }}
    >
      <Link to="/">
        <Navbar.Brand>Conscious Investor App</Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
        {user ? (
          <>
            <Link to={`/${user}`}>
              <Navbar.Text style={{ marginRight: '30px' }}>Profile</Navbar.Text>
            </Link>
            <Button text={'Logout'} onClick={() => logout()} />
          </>
        ) : (
          <Link to="/login">
            <Button text={'Login'} />
          </Link>
        )}
      </Nav>
    </Navbar>
  )
}

export default NavBar

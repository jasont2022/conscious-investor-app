import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Alert } from 'react-bootstrap'
import s from 'styled-components'
// import axios from 'axios'

const FormWrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 600px;
  padding-left: 15px;
  padding-right: 15px;
`

const SubmitButton = s.button`
  width: 100%;
  border: none;
  padding: 17px 32px;
  text-decoration: none;
  border-radius: 10px;
  background: linear-gradient(-70deg,#ff7170,#ffe57f);
  color: white;
  opacity: ${props => (props.disable ? 0.5 : 1)};
  :disabled:hover {
    cursor: not-allowed;
  }
`

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const signUp = async e => {
    // e.preventDefault()
    // try {
    //   const res = await axios.post('/account/signup', {
    //     username, password, email, firstname, lastname, avatar,
    //   })
    //   console.log(res)
    //   router.push('/login')
    // } catch (err) {
    //   setErrMsg(`${err}`)
    // }
  }

  return (
    <FormWrapper>
      {errMsg !== '' ? (
        <Alert variant="danger" onClose={() => setErrMsg('')} dismissible>
          {errMsg}
        </Alert>
      )
        : null}
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <Form style={{ marginTop: '1.5em' }}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastname}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <p style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> Fields are required</p>
        <SubmitButton
          style={{ margin: '1rem 0' }}
          onClick={e => signUp(e)}
          disabled={!username || !email || !password || !firstname || !lastname}
          disable={!username || !email || !password || !firstname || !lastname}
        >
          Sign Up
        </SubmitButton>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </Form>
    </FormWrapper>
  )
}

export default Register

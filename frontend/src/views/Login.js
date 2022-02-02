import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import s from 'styled-components'
import axios from 'axios'

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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // function that handles login logic with backend
  const login = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/account/login', { email, password })
      console.log(res)
      navigate('/')
    } catch (err) {
      console.log(`${err}`)
    }
  }

  return (
    <FormWrapper>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <Form style={{ marginTop: '1.5em' }}>
        <Form.Group controlId="formBasicemail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <SubmitButton
          style={{ margin: '1rem 0' }}
          onClick={e => login(e)}
          disabled={!email || !password}
          disable={!email || !password}
        >
          Login
        </SubmitButton>
        <p style={{ textAlign: 'center' }}>
          No account? <Link to="/register">Create one</Link>
        </p>
      </Form>
    </FormWrapper>
  )
}

export default Login

import React, { useState, useEffect } from 'react';
//import Navbar from '../components/Navbar';

import Navbar from '../NavbarC';
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from '@mui/material/Button';

const Title = {
  width: "300px",
  margin: "30px auto",
  boxSizing: "border-box",
  textAlign: "center"
}

const Row = {
  display: "flex"
}

const Column1 = {
  flex: "50%",
  maxWidth: "50%",
  minWidth: "50%",
  alignSelf: "center",
  padding: "20px",
  margin: "10px",
  display: 'content'
}

const Column2 = {
  flex: "50%",
  minWidth: "50%"
}

const dot = {
  height: "20px",
  width: "20px",
  borderRadius: "50%",
  display: "inline-block",
  textAlign:"center",
  fontSize: "x-small",
  backgroundColor:"white",
  color:"black",
  verticalAlign:"super"
}


export class SettingComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      preferences: [],
      username: '',
      password: ''
    }

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({username: event.target.value});
  }

  handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username + " " + this.state.password);
    event.preventDefault();
  }


  componentDidMount() {
    axios.get("/account/categories")
    .then(res => {
      const category = res.data;
      this.setState({ category });
      axios.get('/account/user').then(user => {
        this.setState({preferences: user.data.preferences})
      })
    })
  }

  render() {
    return (
    <div>
      <Navbar />
      <div style={{height:40}}></div>
      <h1 style={{textAlign:"center"}}>Settings</h1>
      <div style={{height:30}}></div>
      <div style={Row}>
        <div style={{textAlign: '-webkit-center',height:""}}>
          <div style={Column1}>
            <h2 style={{textAlign:"center"}}>How to use Preferences</h2>
            <p style={{textAlign:"center"}}>Adjust your commitment to certain ESG categories here. As you change the scale for a category, our
            algorithm continues to personalize your portfolio scores, as well as your recommendations, to match your beliefs. We scale each
            preference from 1 being apathetic, and 5 for compassionate. After making adjustments, select "Submit Change". Thank you!</p>
            <form onSubmit={this.handleSubmit} style={{paddingLeft:"100px", paddingTop:"20px"}}>
            </form>
          </div>
          <div style={{paddingLeft:"10px", paddingTop:"30%"}}>
          <Button variant="outlined" color="error" onClick = {(e) => { 
              var result = window.confirm("Want to delete?");
              if (result) {
                axios.delete("/account/remove-account").then(res => {
                  window.location.replace("/");
                })
              }
              }}>
            DELETE ACCOUNT
          </Button>
          </div>
        </div>
        <div style={Column2}>
          <ul style={{overflowY:"auto", height: "26%"}}>
            {
              this.state.category
                .map((person, index) =>
                  <div style={{paddingTop:"15px"}}>
                    <li style={{listStyle: "none", display:"contents", fontSize:"35px"}}> {person["Title of Data Point"]}</li>
                    <Popup trigger={<button style={dot}>i</button>} position="right center">
                      <div>{person["Description"].slice(0,-32)}</div>
                    </Popup>
                    <label style={{display:"block"}}>
                    Set New Preference:
                    <input index={index} onChange={(e)=> {
                      const preferencesCopy = this.state.preferences.slice()
                      preferencesCopy[index] = Number(e.target.value)
                      this.setState({ preferences : preferencesCopy})
                    }} value={"" + this.state.preferences[index]} type="number" size="2" max="5" min="1" name="name" style={{width:"200px"}}/>
                    </label>
                  </div>
                )
            }
          </ul>
          <div style={{alignItems:"center", display: "flex", justifyContent: "center", paddingTop:"20px"}}>
            <Button color="secondary" onClick={(e)=> {
              axios.post('/account/preferences', {
                preferencesList: this.state.preferences
              })
              .then(function (response) {
                alert("Successfully Updated")
                window.location.reload()
                console.log(response);
              })
              .catch(function (error) {
                alert("Could Not Update, Try Again")
                console.log(error);
              });
            } } color="primary" variant="contained" value="Submit Change">Submit Change</Button>
          </div>
        </div>
      </div>
    </div> 
    )
  }
}
// add more props to Navbar see Navbar.js
const Settings = () => {

  axios.get('localhost:8080/account/categories')

  return (
    <h1>Hello</h1>
  )
}

export default Settings;
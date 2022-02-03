import React, { useState, useEffect } from 'react';
//import Navbar from '../components/Navbar';

import Navbar from '../NavbarC';
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
  alignSelf: "center",
  border: "solid",
  padding: "20px",
  margin: "10px"
}

const Column2 = {
  flex: "50%"
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
      <h1 style={Title}>Settings</h1>
      <div style={Row}>
        <div>
          <div style={Column1}>
            <h2 style={{textAlign:"center"}}>Robinhood API Login</h2>
            <h6 style={{textAlign:"center"}}>Enter your Robinhood login information to update your portfolio with us to reflect your current holdings.</h6>
            <form onSubmit={this.handleSubmit} style={{paddingLeft:"100px", paddingTop:"20px"}}>
            <label style={{paddingRight:"50px"}}>
              Username:
              <input type="text" value={this.state.username} onChange={this.handleChangeUser} />
            </label>
            <label style={{paddingRight:"50px"}}>
              Password:
              <input type="text" value={this.state.password} onChange={this.handleChangePass} />
            </label>
            <div style={{alignItems:"center", display: "flex", justifyContent: "center", paddingTop:"20px"}}>
              <input type="submit" value="Submit" style={{display: "block", width:"100px", alignItems:"center"}} />
            </div>
            </form>
          </div>
          <div style={{paddingLeft:"10px", paddingTop:"30%"}}>
            <input type="submit" value="DELETE ACCOUNT" onClick = {(e) => { 
              var result = window.confirm("Want to delete?");
              if (result) {
                axios.delete("/account/remove-account").then(res => {
                  window.location.replace("/");
                })
              }
              }}
              style={{float:'left', backgroundColor:"#E93B0A"}}/>
          </div>
        </div>
        <div style={Column2}>
          <h2 style={{textAlign:"center"}}>Preferences</h2>
          <h6 style={{textAlign:"center"}}>From a scale of 1 (low preference) to 5 (high preference) - Scroll to see all 18 Preferences</h6>
          <ul style={{overflowY:"auto", height: "500px"}}>
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
            <input onClick={(e)=> {
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
            } } type="button" value="Submit Change" style={{display: "block", width:"200px", alignItems:"center"}} />
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
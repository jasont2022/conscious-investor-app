import React from 'react';
//import Navbar from '../components/Navbar';

import Navbar from '../NavbarC';

// add more props to Navbar see Navbar.js
const Settings = () => (
  <div>
    <Navbar />
    <h1>Settings</h1>
    <div>
      <h2>Robinhood API Login</h2>
      <label>
      Username:
      <input type="text" name="name" />
      </label>
      <label>
      Password:
      <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </div>
    <div>
      <h2>Preferences</h2>
      
    </div>
    
  </div>  

)

export default Settings;
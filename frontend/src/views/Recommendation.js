import React from 'react';
import Navbar from '../NavbarC';

// add more props to Navbar see Navbar.js
export class Recommendation extends React.Component {

  render() {
    return (
    <div>
      <Navbar />
      <h1>Recommendation</h1>
    </div> 
    )
  }
}

export default Recommendation;
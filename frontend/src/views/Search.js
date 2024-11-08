import React from 'react';
//import Navbar from '../components/Navbar';
import axios from 'axios'
import Navbar from '../NavNew/TopNav';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBar from '../components/SearchBar'
import CardList from '../components/CardList'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../components/Search.css'
import { TailSpin } from  'react-loader-spinner';
import { Outlet } from 'react-router-dom';

// add more props to Navbar see Navbar.js
export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      searchField:'',
      porfolio: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get("/account/total-companies")
      .then(res => {
        const companies = res.data;
        this.setState({ companies : companies });
        axios.get('/account/user').then(user => {
          this.setState({portfolio: user.data.portfolio})
          this.setState({loading: false})
        })
      })
    }


  render() {
    const {companies, searchField} = this.state
    const filteredCompanies = companies.filter(company => (
      company.Symbol.toLowerCase().includes(searchField.toLowerCase())
    ))
    return (
    <div>
      <Sidebar />
      <Outlet/>
      <div style={{paddingLeft:"15%"}}>
        <SearchBar placeholder="Enter Company Ticker" handleChange={(e)=>this.setState({searchField: e.target.value})}/>
      </div>
      <div style={{paddingLeft:"45%"}}>
        {this.state.loading ? <TailSpin color="#00BFFF" height={80} width={80} /> : null }
      </div>
      <div style={{paddingLeft:"22%"}}>
       <CardList companies= {filteredCompanies.slice(0,20)} portfolio={this.state.portfolio}/>
      </div>
    </div> 
    )
  }
}

export default Search;
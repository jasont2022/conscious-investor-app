import React from 'react';
//import Navbar from '../components/Navbar';
import axios from 'axios'
import Navbar from '../NavbarC';
import SearchBar from '../components/SearchBar'
import CardList from '../components/CardList'

// add more props to Navbar see Navbar.js
export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      searchField:''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8080/account/total-companies")
      .then(res => {
        const companies = res.data;
        this.setState({ companies : companies });
        console.log(companies)
      })
    }


  render() {
    const {companies, searchField} = this.state
    const filteredCompanies = companies.filter(company => (
      company.Symbol.toLowerCase().includes(searchField.toLowerCase())
    ))
    return (
    <div>
      <Navbar />
      <SearchBar placeholder="Enter Company Ticker" handleChange={(e)=>this.setState({searchField: e.target.value})}/>
      <CardList companies= {filteredCompanies} />
    </div> 
    )
  }
}

export default Search;
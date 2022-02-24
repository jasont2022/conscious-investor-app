import React from 'react'
import Card from './Card'
import './cardlist.css'
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const CardList = ({ companies, portfolio }) => (
  <div className='companylist'>     
    {
      companies.map(company => <Card key={company._id} comp={company} portfolio = {portfolio}/>)
    }
  </div>
)

export default CardList;
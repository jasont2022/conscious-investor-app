import React from 'react'
import Search from '../views/Search'
import Card from './Card'
import './cardlist.css'

const CardList = (props) => {
  return (
    <div className='companylist'>
      {
        props.companies.map(company => <Card key={company._id} comp={company}/>)
      }
    </div>
  )
}

export default CardList;
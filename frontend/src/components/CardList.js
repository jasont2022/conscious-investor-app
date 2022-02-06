import React, {useEffect, useRef} from 'react'
import Search from '../views/Search'
import Card from './Card'
import './cardlist.css'
import "../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const CardList = (props) => {
  
  return (
    <div className='companylist'>     
      {
        props.companies.map(company => <Card key={company._id} comp={company} portfolio = {props.portfolio}/>)
      }
    </div>
  )
}

export default CardList;
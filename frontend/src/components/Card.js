import React from 'react'
import Search from '../views/Search'
import './Card.css'

const Card = (props) => {
  return (
    <div className='company'>
      <h2>{props.comp.Description}</h2>
      <div className='describe'>
        <p>Ticker: {props.comp.Symbol}</p>
        <p>Market Cap: {props.comp['Market cap']}</p>
        <p>Dividend: {props.comp['Dividend yield']}</p>
        <p>Industry: {props.comp['GICS Sector']}</p>
        <button>ADD TO PORTFOLIO</button>
        <button>GO TO PAGE</button>
      </div>
    </div>
  )
}

export default Card;
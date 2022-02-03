import React from 'react'
import './Card.css'
import axios from 'axios'

const Card = (props) => {
  var alreadyHere = false
  try {
    alreadyHere = props.portfolio.includes(props.comp.Symbol)
  } catch (e) {
    console.log(e)
  }

  return (
      <div className='company'>
        <a href={"financial/" + props.comp.Symbol}>
          <h2>{props.comp.Description}</h2>
          <div className='describe'>
            <p>Ticker: {props.comp.Symbol}</p>
            <p>Market Cap: {props.comp['Market cap']}</p>
            <p>Dividend: {props.comp['Dividend yield']}</p>
            <p>Industry: {props.comp['GICS Sector']}</p>
          </div>
        </a>
      <input type="submit" value= {alreadyHere ? "Remove from Portfolio" : "Add to Portfolio"} onClick={(e)=> {
        if (!alreadyHere) {
          axios.post('/account/add-portfolio/' + props.comp.Symbol, {
          })
          .then(function (response) {
            window.location.reload()
          })
          .catch(function (error) {
            alert("Could Not Update, Try Again")
            console.log(error);
          });
        } else {
          axios.post('/account/remove-portfolio/' + props.comp.Symbol, {
          })
          .then(function (response) {
            alert("Successfully Updated")
            window.location.reload()
          })
          .catch(function (error) {
            alert("Could Not Update, Try Again")
            console.log(error);
          });
        }

        }} style={{margin :"10px"}}/>
      </div>
  )
}

export default Card;
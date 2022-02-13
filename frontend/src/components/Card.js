import React from 'react'
import './Card.css'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { color } from '@mui/system';

const CardMine = (props) => {
  var alreadyHere = false
  try {
    alreadyHere = props.portfolio.includes(props.comp.Symbol)
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <Card sx={{ minWidth: 275, minHeight: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.comp.Symbol}
          </Typography>
          <Typography variant="h5" component="div">
          {props.comp['Description']}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.comp['GICS Sector']}
          </Typography>
          <Typography variant="body2">
            {"Market Cap : " + props.comp['Market cap']}
            <br />
            {"Dividend Yield : " + props.comp['Dividend yield']}
          </Typography>
        </CardContent>
        <CardActions sx={{placeContent: 'center'}}>
          <Button onClick={() => window.location.replace("financial/" + props.comp.Symbol)} variant="outlined" size="small">Learn More</Button>
          <Button variant="outlined" size="small" onClick={(e)=> {
           if (!alreadyHere) {
            axios.post('/account/add-portfolio/' + props.comp.Symbol, {}
            ).then(function (response) {
              window.location.reload()
            }).catch(function (error) {
              alert("Could Not Update, Try Again")
              console.log(error);
            });
           } else {
            axios.post('/account/remove-portfolio/' + props.comp.Symbol, {}
            ).then(function (response) {
                console.log("Successfully Updated")
                window.location.reload()
              })
              .catch(function (error) {
                alert("Could Not Update, Try Again")
                console.log(error);
              });
           }
          }}>
          {alreadyHere ? "Remove" : "Add"}</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CardMine;
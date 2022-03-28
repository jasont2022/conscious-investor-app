import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Typography';

import Image from './how-to-create-cool-website-backgrounds-the-ultimate-guide.png'; // Import using relative path

function AboutUs(props) {
  return (
    <div>
      {props.isAuth ? <Sidebar/> : <div/>}
      <Box
          class="candles"
          style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          height: "120vh",
          color: "#f5f5f5",
          marginTop:"-10%"
      }}>
        <div style={{ padding: 30 }} >
          <Grid container spacing={10} justify="center">
            <Card variant="outlined" style={{marginLeft:"30%", marginTop:"10%", width:"50%", height:"50%", textAlign:"center", alignItems:"center"}}>
            <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 30, marginBottom:"5%"}} color="text.primary" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="h5" component="div">
                  What is ESG
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom:"5%"}}>
                ESG stands for Environmental, Social, and Governance. ESG is a tool for measuring a company’s level of sustainability. Environmental factors take into account how a company affects its environment; for example, its carbon footprint, energy consumption, and waste disposal. Social factors encompass a company’s relationship with its employees; for example, its approach to human rights and issues like diversity and inclusion. Governance factors involve a company’s treatment of minority shareholders, board diversity, and political contributions. The ESG score ranges from 0-100; generally, any score below 50 is considered low, while any score above 70 is a good score.
                </Typography>
                <Typography variant="h5" component="div">
                  Why is ESG Important
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom:"5%"}}>
                Companies with better ESG scores have a stronger financial performance based on operational metrics, such as corporate financial performance (CFP), return on equity (ROE), and return on assets (ROA). Furthermore, there is evidence across numerous time periods and regions that Integrating ESG into the investment process benefits portfolio risk and return as it yields lower volatility, lower risk, and therefore higher risk-adjusted returns.
                </Typography>
                <Typography variant="h5" component="div">
                  How We Help
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Our tool would help customers consider ESG metrics in their investment strategy to help mitigate risks and provide a higher return on their investment. Our solution will cater to investor-specific beliefs as investors can assign specific weights to 18 ESG categories, which are then normalized to create a customized ESG score. We provide the user with stock recommendations using a a regression model that defines a relationship between the companies’ ESG scores and their returns, volatilities, and size.
                </Typography>
              </CardContent>
              <CardActions>
                {!props.isAuth ? <Button size="medium" href="/login" variant="contained">Login</Button> : <div/>}
              </CardActions>
            </React.Fragment>
            </Card>
          </Grid>
        </div>
        
      </Box>

    </div>
  )
}

export default AboutUs
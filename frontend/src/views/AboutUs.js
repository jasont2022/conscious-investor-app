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
                I'm baby pork belly subway tile pabst, YOLO live-edge hell of celiac asymmetrical actually before they sold out fam raclette sriracha cold-pressed bushwick. Letterpress shabby chic put a bird on it affogato. Slow-carb paleo trust fund before they sold out, tote bag cornhole salvia polaroid cardigan semiotics you probably haven't heard of them 8-bit lumbersexual blog enamel pin. Organic knausgaard tattooed asymmetrical, unicorn lyft fanny pack green juice. Mlkshk 8-bit cliche, chartreuse slow-carb williamsburg shabby chic typewriter ethical authentic street art yuccie narwhal vegan. Quinoa swag stumptown, direct trade asymmetrical yr ramps meh schlitz VHS dreamcatcher aesthetic copper mug shabby chic enamel pin.
                </Typography>
                <Typography variant="h5" component="div">
                  Why is ESG Important
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{marginBottom:"5%"}}>
                I'm baby pork belly subway tile pabst, YOLO live-edge hell of celiac asymmetrical actually before they sold out fam raclette sriracha cold-pressed bushwick. Letterpress shabby chic put a bird on it affogato. Slow-carb paleo trust fund before they sold out, tote bag cornhole salvia polaroid cardigan semiotics you probably haven't heard of them 8-bit lumbersexual blog enamel pin. Organic knausgaard tattooed asymmetrical, unicorn lyft fanny pack green juice. Mlkshk 8-bit cliche, chartreuse slow-carb williamsburg shabby chic typewriter ethical authentic street art yuccie narwhal vegan. Quinoa swag stumptown, direct trade asymmetrical yr ramps meh schlitz VHS dreamcatcher aesthetic copper mug shabby chic enamel pin.
                </Typography>
                <Typography variant="h5" component="div">
                  How We Help
                </Typography>
                <Typography variant="body2" color="text.secondary">
                I'm baby pork belly subway tile pabst, YOLO live-edge hell of celiac asymmetrical actually before they sold out fam raclette sriracha cold-pressed bushwick. Letterpress shabby chic put a bird on it affogato. Slow-carb paleo trust fund before they sold out, tote bag cornhole salvia polaroid cardigan semiotics you probably haven't heard of them 8-bit lumbersexual blog enamel pin. Organic knausgaard tattooed asymmetrical, unicorn lyft fanny pack green juice. Mlkshk 8-bit cliche, chartreuse slow-carb williamsburg shabby chic typewriter ethical authentic street art yuccie narwhal vegan. Quinoa swag stumptown, direct trade asymmetrical yr ramps meh schlitz VHS dreamcatcher aesthetic copper mug shabby chic enamel pin.
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
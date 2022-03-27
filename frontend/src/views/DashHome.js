import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../NavNew/TopNav';

import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material'
var htmlparser = require('htmlparser2');



const columns = [
  { field: 'id', headerName: 'Number', width: 90 },
  {
    field: 'logo',
    headerName: 'Logo',
    width: 80,
    editable: true,
    renderCell: (params) => (
      <strong>
        <Avatar alt="Remy Sharp" src={`${params.value}`} />
      </strong>
    )
  },
  {
    field: 'companyName',
    headerName: 'Company name',
    width: 300,
    editable: true,
  },
  {
    field: 'industry',
    headerName: 'Industry',
    width: 150,
    editable: true,
  },

  {
    field: 'esg',
    headerName: 'ESG',
    width: 200,
    editable: true,
  }
  
];




const financial_columns = [
  { field: 'id', headerName: 'Ticker', width: 60 },
  {
    field: 'logo',
    headerName: 'Logo',
    width: 80,
    editable: true,
    renderCell: (params) => (
      <strong>
        <Avatar alt="Remy Sharp" src={`${params.value}`} />
      </strong>
    )
  },
  {
    field: 'companyName',
    headerName: 'Company name',
    width: 150,
    editable: true,
  },
  {
    field: 'industry',
    headerName: 'Industry',
    width: 200,
    editable: true,
  },
  {
    field: 'marketCap',
    headerName: 'Market Cap (millions)',
    width: 200,
    editable: true,
  },
  {
    field: 'excess_return',
    headerName: 'Excess Return (millions)',
    width: 200,
    editable: true,
  }
];

const News = ({ article }) => {
  const { author, text, publishedDate, title, url, image } = article || {}
  var result = [];

  var parser = new htmlparser.Parser({
    ontext: function (text) {
      result.push(text);
    }
  }, { decodeEntities: true });

  parser.write(text);
  parser.end();

  result.join('');

  return (
    <div>
      <Card sx={{ maxWidth: "80%", marginTop: "40px", marginLeft: "5%"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {author}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
              {publishedDate.slice(0, 10)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {result}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href={url} target="_blank">
            Go To Article
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));


const Dashboard = () => {

    const [fullRecs, setFullRecs] = useState([]); // full_recs
    const { tick } = useParams()
    const [articlesAll, setArticles] = useState([]) // get the news artcles

    const model = 'esg';
    const rows = 10;

    useEffect(() => {
        handleApplyChanges()
    }, []);



  const handleApplyChanges = async () => {


    const { data } = await axios.get(`https://financialmodelingprep.com/api/v3/stock_news?limit=5&apikey=e605026ed16aae3b084c6297f09bba6c`)
    setArticles(data)

    if (model === 'esg'){

        axios.get(`/account/portfolio/`).then(res => {
          console.log('res', res.data)
          const recsCopy = []
          res.data.forEach(code => {
            axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${code}&token=c80soqqad3ie5egte6d0`).then(comp => {
            axios.get(`/account/ticker/${code}`).then(score => {
              const scoreString = " " + (score.data.score)
              const thenum = scoreString.replace( /^\D+/g, '');
              
              const single = {
                id: code,
                logo: comp.data.logo,
                companyName: comp.data.name,
                industry: comp.data.finnhubIndustry,
                esg: Math.floor(Number(thenum * 1000))/10
              }
              console.log(single)
              recsCopy.push(single)
              console.log(recsCopy)
              if (recsCopy.length === res.data.length) {
                setFullRecs(recsCopy)
            }              
            })
          })
        });
        
      })
      
    } 
  }

  return (
    <div>
      <style>{'body {background-color: white; padding: 20px 0px 0px 323px }'}</style>
      <Sidebar/>
      <Container maxWidth={false} sx={{ backgroundColor: '#EFE5FF'}}>
        <Box sx={{ fontWeight: 'bold', fontSize: 40, textAlignLast: 'center'}}>Dashboard</Box>
        <Box sx={{ fontWeight: 'bold', height: 10 }}></Box>
      </Container>

      <FormGroup className="MuiFormGroup-options" sx={{display:"block", textAlignLast:'center'}}>
        <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{width:100, margin:5}}
            onClick={handleApplyChanges}
        >
            Refresh
        </Button>
      </FormGroup>


      <div style={{ height: 600, width: '70%', margin: 'auto'}}>
        <DataGrid
            rows={fullRecs.sort((a, b) => parseFloat(b.excess_return) - parseFloat(a.excess_return)).slice(0, rows)}
            columns={model === 'esg' ? columns : financial_columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
        />
      </div>
      <br/>
      <br/>

      <Typography variant="h4" gutterBottom component="div" style={{marginLeft: "5%"}}>
          News
        </Typography>

        {console.log(articlesAll)}
      
        <div style={{ marginBottom: '50px' }}>
          {articlesAll.map((article, i) => <News key={i} article={article} />)}
        </div>

      
    </div>
  );
};

export default Dashboard; 
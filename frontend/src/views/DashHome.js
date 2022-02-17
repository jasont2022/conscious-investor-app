import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../NavNew/TopNav';
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
  { field: 'id', headerName: 'Ticker', width: 90 },
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


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      industry: 'Information Technology',
      state:'',
      dividend:false,
      model:'esg',
      rows : 10,
      full_recs: []
    }

    this.handleChangeRows = this.handleChangeRows.bind(this);
    this.handleApplyChanges = this.handleApplyChanges.bind(this);
  }

 

  handleChangeRows(event) {
    this.setState({rows: event.target.value});
    event.preventDefault();
  }

 

  handleChangeModel(event) {
    this.setState({model: event.target.value});
    event.preventDefault();
  }

  handleApplyChanges(event) {
    this.setState({ full_recs : []})
    if (this.state.model === 'esg'){
      axios.get(`/account/portfolio/`).then(res => {
        var total = res.data
        
        total.forEach(total => {
          
          axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${total}&token=c80soqqad3ie5egte6d0`).then(comp => {
            axios.get(`/account/ticker/${total}`).then(scr => {
              var score = scr
              var thenum = score.data.replace( /^\D+/g, '');
              var recsCopy = this.state.full_recs.slice()
              var single = {
                id: total[0],
                logo: comp.data.logo,
                companyName: comp.data.name,
                industry: comp.data.finnhubIndustry,
                esg: Math.floor(Number(thenum * 1000))/10

              }
              recsCopy.push(single)
              this.setState({ full_recs : recsCopy})
            })
          })
        });
      })
    } 
    event.preventDefault();
  }

  render(){
  return (
    <div>
      <style>{'body {background-color: white; padding: 0px 0px 0px 323px }'}</style>
      <Navbar/>
      <Sidebar/>
      <Container maxWidth={false} sx={{ backgroundColor: '#EFE5FF'}}>
        <Box sx={{ fontWeight: 'bold', fontSize: 40, textAlignLast: 'center'}}>Dashboard</Box>
        <Box sx={{ fontWeight: 'bold', height: 10 }}></Box>
      </Container>
      <FormGroup className="MuiFormGroup-options" row sx={{display:"block", textAlignLast:'center'}}>
   
      
      
      <Button
        size="small"
        variant="outlined"
        color="primary"
        sx={{width:100, margin:5}}
        onClick={this.handleApplyChanges}
      >
        Refresh
      </Button>
      </FormGroup>


      <div style={{ height: 600, width: '70%', margin: 'auto'}}>
      <DataGrid
        rows={this.state.full_recs.sort((a, b) => parseFloat(b.excess_return) - parseFloat(a.excess_return)).slice(0, this.state.rows)}
        columns={this.state.model === 'esg' ? columns : financial_columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>

    </div>
  );
  }
}

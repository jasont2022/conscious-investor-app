import React from 'react'
import Search from '../views/Search'
import './SearchBar.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const SearchBar = (props) => {
  return (
    <div className='searchBar'>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Search
      </Typography>
      <TextField
        label="Ticker"
        id="outlined-size-normal"
        defaultValue=""
        sx={{minWidth:300}}
        onChange={props.handleChange} />
    </div>
  )
}

export default SearchBar;
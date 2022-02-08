import React from 'react'
import Search from '../views/Search'
import './SearchBar.css'

const SearchBar = (props) => {
  return (
    <div className='searchBar'>
      <input type='search'
      className='search'
      placeholder={props.placeholder}
      onChange={props.handleChange}
      />
    </div>

  )
}

export default SearchBar;
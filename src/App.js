import './style.scss';
import React from 'react'
import Nav from './Nav';
import Movies from './Movies';
import { useState } from 'react';
const App = () => {
    const [searchResults,setSearchResults]=useState([])
  return (
    <div className='appcontainer'>
    <Nav setter={setSearchResults} />
    <Movies results={searchResults}/>
   </div>
  )
}

export default App
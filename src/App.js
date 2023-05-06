import './style.scss';
import React from 'react'
import Nav from './Nav';
import Movies from './Movies';
import { useState } from 'react';
import {ct} from './contexts/context'

const App = () => {
  const[show,setShow]=useState(true)
    const [movies,setMovies]=useState([]);
    const [myList,setMyList]=useState([]);
  return (
<ct.Provider value={{movies,setMovies,myList,setMyList,show,setShow}}>
    <div className='appcontainer'>
    <Nav/>
    <Movies/>
   </div>
   </ct.Provider>
  )
}

export default App
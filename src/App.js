import './style.scss';
import React from 'react'
import Nav from './Nav';
import Movies from './Movies';
import { useState } from 'react';
import {ct} from './contexts/context'

const App = () => {
  async function showMyList() {
    const arr=[]
  for(const a of myList) {
    const myfav=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1`)
    const jn=await myfav.json()
    arr.push(jn)  
  }
  setMovies(arr)
  setShow(false)
  }
  const[show,setShow]=useState(true)
    const [movies,setMovies]=useState([]);
    const [myList,setMyList]=useState([]);
  return (
<ct.Provider value={{movies,setMovies,myList,setMyList,show,setShow,showMyList}}>
 
    <div className='appcontainer'>
    <Nav/>
    <Movies/>
   </div>
   </ct.Provider>
  )
}

export default App
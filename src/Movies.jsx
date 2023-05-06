import React, { useState } from 'react'
import { useEffect,useContext } from 'react'
import {MdAdd,MdOutlineRemoveCircleOutline} from "react-icons/md"

import { ct } from "./contexts/context";
const Movies = () => {  
const [checkIndex,setCheckIndex]=useState(null)
  const {movies,setMovies,myList,setMyList,show}=useContext(ct)
console.log(checkIndex)
useEffect(() => {
  window.localStorage.setItem('myList', JSON.stringify(myList));
}, [myList]);

function addToList(id) {
setMyList([...myList,id])

}
async function removeFromList (id) {
  const arr=[]
  const updatedList=myList.filter(e=>e!==id)
  setMyList(updatedList)
  window.localStorage.setItem('myList', JSON.stringify(updatedList));
 for(const a of updatedList) {
  const list=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&language=en-US&page=1`)
  const jn=await list.json()
  arr.push(jn)
 }
  setMovies(arr)
}
function checkClicked(movieindex) {
setCheckIndex(checkIndex===movieindex?null:movieindex)
}
const postersurl='https://image.tmdb.org/t/p/w500'
  return (
    <>
{!show && <h1>Mylist</h1>}

  <div className='movies'>
  {movies.map((movie, index) => (
 <div   key={index} className='moviecard'>
<div onClick={()=>checkClicked(index)}  className='ratingimage'>
{ show && <MdAdd onClick={()=>addToList(movie.id)}  size='1.5em' className='controlicon'/>}
{!show&& myList.length>0 && <MdOutlineRemoveCircleOutline onClick={()=>removeFromList(movie.id)}  size='1.6em' className='controlicon'></MdOutlineRemoveCircleOutline>}
<div className='rating'>
  <img src={process.env.PUBLIC_URL + '/star-regular.svg '}></img>
  <span>{Math.floor(movie.vote_average* 10) / 10}</span>
 </div>
 <img src={postersurl + movie.poster_path}></img>
</div>
<div className='info'> 
<p>{movie.title}</p>

</div>
<div className='overview'>
{index===checkIndex && <p>{movie.overview}</p>}
</div>
 </div>
  ))}
   </div>

  
     </>
  )

 
}

export default Movies
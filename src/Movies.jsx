import React, { useState } from 'react'
import { useEffect,useContext } from 'react'
import {MdAdd,MdOutlineRemoveCircleOutline,MdDelete} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ct } from "./contexts/context";
const Movies = () => {  

const [checkIndex,setCheckIndex]=useState(null)
  const {movies,setMovies,myList,setMyList,show,setShow}=useContext(ct)

useEffect(() => {
  window.localStorage.setItem('myList', JSON.stringify(myList));
}, [myList]);

function addToList(id,name) {
  const updatedArray = [...myList,id];
setMyList(updatedArray)
toast(`${name} is added to mylist`,{
  onClick: () => showMyList(updatedArray)
 })

}
async function clearMyList () {
  setMyList([])
  window.localStorage.setItem('myList', JSON.stringify([]));
 toast(`all movies deleted`)
  setMovies([])
}
async function showMyList(array) {
  const arr=[]
for(const a of array) {
  const myfav=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1`)
  const jn=await myfav.json()
  arr.push(jn)  
}

setMovies(arr)
setShow(false)
}
async function removeFromList (id,name) {
  const arr=[]
  const updatedList=myList.filter(e=>e!==id)
  setMyList(updatedList)
  window.localStorage.setItem('myList', JSON.stringify(updatedList));
 for(const a of updatedList) {
  const list=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&language=en-US&page=1`)
  const jn=await list.json()
  arr.push(jn)
 }
 toast(`${name} is removed from mylist`)
  setMovies(arr)
}

function checkClicked(movieindex) {
setCheckIndex(checkIndex===movieindex?null:movieindex)
}
const postersurl='https://image.tmdb.org/t/p/w500'
  return (
    <>
    <ToastContainer/>
<div className='mylist'>
<div className='controllist'>
{!show && <h1>Mylist</h1>}
{ !show && <MdDelete onClick={clearMyList} size='1.7em' className='del'></MdDelete>}
</div>
  <div className='movies'>
  {movies.map((movie, index) => (
 <div   key={index} className='moviecard'>
<div className='ratingimage'>
{ show && <MdAdd onClick={()=>addToList(movie.id,movie.title)}  size='1.8em' className='controlicon'/>}
{!show&& myList.length>0 && <MdOutlineRemoveCircleOutline onClick={()=>removeFromList(movie.id,movie.title)}  size='1.8em' className='controlicon'></MdOutlineRemoveCircleOutline>}
<div className='rating'>
  <img src={process.env.PUBLIC_URL + '/star-regular.svg '}></img>
  <span>{Math.floor(movie.vote_average* 10) / 10}</span>
 </div>
 <img src={postersurl + movie.poster_path}></img>
</div>
<div onClick={()=>checkClicked(index)} className='info'> 
<p>{movie.title}</p>
   
</div>
<div className='overview'>
{index===checkIndex && <p>{movie.overview}</p>}
</div>
 </div>
  ))}
   </div>

   </div>
     </>
  )

 
}

export default Movies
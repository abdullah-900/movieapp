import React, { useState } from 'react'
import { useEffect,useContext,useRef } from 'react'
import {MdAdd,MdOutlineRemoveCircleOutline,MdDelete} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { ct } from "./contexts/context";
const Movies = () => {  
const [checkIndex,setCheckIndex]=useState(null)
const [showp,setShowP]=useState(false)
const buttons=[1,2,3,4,5,6,7]
  const {movies,setMovies,myList,setMyList,show,setShow,genre}=useContext(ct)
  const [sh,setSh]=useState(false)
  const [reviews,setReviews]=useState([])
  const [i,seti]=useState(null)
  async function handleSelect(val,num) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
      const list=await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&language=en-US&page=${num}`)
      const jn=await list.json()
      setMovies(jn.results)
      
  }
function handleExtend(index) {
seti(i===index?null:index)
setShowP(!showp)
}
function fixUrl(url) {
  let base='https://secure.gravatar.com/avatar/'
  if (url!==null) { 
    if (/https:\/\/secure\.gravatar\.com\/avatar\//.test(url)) {
      let fixedUrl = url.replace(/^\/+/, "");
      return fixedUrl
    } else{
      return base+url
    }

  }else {
    return 'https://i.imgur.com/OAI1jMl.png'
  }
}
useEffect(() => {
  window.localStorage.setItem('myList', JSON.stringify(myList));
}, [myList]);

function addToList(id,name) {
  if (myList.includes(id)) {
    toast(`${name} is already in mylist`);
  } else {
    const updatedArray = [...myList, id];
    setMyList(updatedArray);
    toast(`${name} is added to mylist`, {
      onClick: () => showMyList(updatedArray),
    });
  }
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
function handleClose(){
  setSh(false)
}
async function showRate(id) {
  setSh(true)
  const list=await fetch(` https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`)
  const jn=await list.json()
 setReviews(jn.results)
}
  return (
    <>
    <ToastContainer/>
<div   className='mylist'>
<div className='controllist'>
{!show && <h1>Mylist</h1>}
{ !show && <MdDelete onClick={clearMyList} size='1.7em' className='del'></MdDelete>}
</div>
  <div style={{ overflowY: 'scroll'}} className='movies'>
  {movies.sort((a, b) => b.vote_average - a.vote_average).map((movie, index) => (
 <div   key={index} className='moviecard'>
<div className='ratingimage'>
{ show && <MdAdd onClick={()=>addToList(movie.id,movie.title)}  size='2.2em' className='controlicon'/>}
{!show&& myList.length>0 && <MdOutlineRemoveCircleOutline onClick={()=>removeFromList(movie.id,movie.title)}  size='2.2em' className='controlicon'></MdOutlineRemoveCircleOutline>}
<div className='rating' onClick={()=>showRate(movie.id)}>
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
   <Modal className='mod' show={sh} onHide={handleClose}>
   <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
{reviews.length>0?reviews.map((r,index)=>(
  <div key={index} className='review'>
<div className='user'>
<img src={fixUrl(r.author_details.avatar_path)}></img>
<span>{r.author}</span>
<div className='rating'>
  <img src={process.env.PUBLIC_URL + '/star-regular.svg '}></img>
  <span>{r.author_details.rating>0?r.author_details.rating:0}</span>
 </div>
</div>
{i===index ?<p onClick={()=>handleExtend(index)}>{r.content}</p>:<p onClick={()=>handleExtend(index)}>{`${r.content.slice(0, 200)}...`}</p>}
</div>
)):<p>no reviews available</p>}
      </Modal>
     { show && <div className='navbuttons'>
     {buttons.map((b,i)=>(
      <button onClick={()=>handleSelect(genre,b)} key={i}>{b}</button>
     ))}
      </div>}
   </div>

     </>
  )

 
}

export default Movies
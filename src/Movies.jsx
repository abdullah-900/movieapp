import React from 'react'
import { useEffect,useState } from 'react'
const Movies = ({results}) => {
const [topRated,setTopRated]=useState([])
console.log(topRated)
  useEffect(()=>{
    async function showTopRated() {
      const top=await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&language=en-US&page=1')
      const jn=await top.json()
      setTopRated(jn.results)
    }
    showTopRated()
  },[])


const postersurl='https://image.tmdb.org/t/p/w500'
if(results.length>0) {
  return (
    <>
    <div className='movies'>
    {results.map((movie, index) => (
   <div key={index} className='moviecard'>
<div className='ratingimage'>
<div className='rating'>
    <img src={process.env.PUBLIC_URL + '/star-regular.svg '}></img>
    <span>{Math.floor(movie.vote_average* 10) / 10}</span>
   </div>
   <img src={postersurl + movie.poster_path}></img>
</div>
  <div className='overview'>
  <p>{movie.title}</p>
  </div>
   </div>
    ))}
     </div>
     </>
  )
}else {
  return (
    <>
    <div className='movies'>
    {topRated.map((movie, index) => (
   <div key={index} className='moviecard'>
<div className='ratingimage'>
<div className='rating'>
    <img src={process.env.PUBLIC_URL + '/star-regular.svg '}></img>
    <span>{Math.floor(movie.vote_average* 10) / 10}</span>
   </div>
   <img src={postersurl + movie.poster_path}></img>
</div>
  <div className='overview'>
  <p>{movie.title}</p>
  </div>
   </div>
    ))}
     </div>
     </>
  )
}
 
}

export default Movies
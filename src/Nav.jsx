import { useState,useEffect,useContext } from "react";
import { useMediaQuery } from 'react-responsive';
import { ct } from "./contexts/context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Nav() {
  const [finish ,setFinish]=useState(false)
  const {setMovies,setMyList,myList,setShow,setGenre}=useContext(ct)
  const [selected,setSelected]=useState(false);
  useEffect (()=>{
    const data = window.localStorage.getItem('myList');
     if (data!==null) setMyList(JSON.parse(data))
    setFinish(true)
 toast('click on movie name to show story and on rating to view reviews')
    },[])
useEffect(()=>{ 
  myList && showMyList()
},[finish])

  const isMobile = useMediaQuery({
    query: '(max-width: 420px)'
  })
  const [keyword,SetKeyword]=useState('')

async function fetchMovies() {
  setShow(true)
  const allmovies=[]
  const data = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&page=1&query=${keyword}`)
  const movie= await data.json()
  for(const a of movie.results) {
    allmovies.push(a)
  }
  const pagesnumber=movie.total_pages
for(var i=2;i<=pagesnumber;i++) {
  const data = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&page=${i}&query=${keyword}`)
  const movie= await data.json()
  for(const a of movie.results) {
    allmovies.push(a)
  }

}
setMovies(allmovies)
  SetKeyword('')
}
function handleKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    fetchMovies()
  }
}
async function handleSelect(val) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  setSelected(val)
  setShow(true)
  setGenre(val)
    const list=await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1&language=en-US`)
    const jn=await list.json()
    setMovies(jn.results)
    
}
async function showMyList(val) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  setSelected(val)
  const arr=[]
for(const a of myList) {
  const myfav=await fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=bdb6d2123e88fcbeacd36ef2ce0e2da1`)
  const jn=await myfav.json()
  arr.push(jn)  
}

setMovies(arr)
setShow(false)
}
 if (isMobile) {
  return (
    <nav className="nav">
      <h1>FilmFinder</h1>
  <form onKeyDown={handleKeyDown} className="searchbar">
    <input value={keyword} onChange={(e)=>{SetKeyword(e.target.value)}} type="search" placeholder="Search"></input>
    <img  onClick={fetchMovies} src={process.env.PUBLIC_URL + '/search.svg '}></img>
  </form>
  <div className="suggestion">
  <a onClick={()=>handleSelect('top_rated')}>TopRated</a>
  <a onClick={()=>handleSelect('popular')}>Popular</a>
  <a onClick={()=>handleSelect('upcoming')}>Upcoming</a>
  <a onClick={showMyList}>Mylist</a>
    </div>
    </nav>
  );
 }else {
  return (
    <nav className="nav">
      <h1>FilmFinder</h1>
  <div onKeyDown={handleKeyDown} className="searchbar">
    <input value={keyword} onChange={(e)=>{SetKeyword(e.target.value)}} type="search" placeholder="Search"></input>
    <img  onClick={fetchMovies} src={process.env.PUBLIC_URL + '/search.svg '}></img>
  </div>
  <ul className="navitems">
    <li><a style={selected==='top_rated'?{color:'#E96479'}:{}} onClick={()=>handleSelect('top_rated')}>TopRated</a></li>
    <li><a style={selected==='popular'?{color:'#E96479'}:{}} onClick={()=>handleSelect('popular')}>Popular</a></li>
    <li><a style={selected==='upcoming'?{color:'#E96479'}:{}} onClick={()=>handleSelect('upcoming')}>Upcoming</a></li>
    <li><a style={selected==='mylist'?{color:'#E96479'}:{}} onClick={()=>showMyList('mylist')}>Mylist</a></li>
  </ul>
    </nav>
  );
 }
}

export default Nav;

import { useState } from "react";
function Nav({setter}) {
  const [keyword,SetKeyword]=useState('')
async function fetchMovies() {
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
  setter(allmovies)
  SetKeyword('')
}
function handleKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    fetchMovies()
  }
}
  return (
    <nav className="nav">
      <h1> Movies</h1>
  <form onKeyDown={handleKeyDown} className="searchbar">
    <input value={keyword} onChange={(e)=>{SetKeyword(e.target.value)}} type="search" placeholder="Search"></input>
    <img  onClick={fetchMovies} src={process.env.PUBLIC_URL + '/search.svg '}></img>
  </form>
    <a>topRated</a>
    </nav>
  );
}

export default Nav;

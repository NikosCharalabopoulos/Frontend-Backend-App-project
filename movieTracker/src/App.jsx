import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm'
import './App.css'


function App() {
  const [movies, setMovies] = useState([])
  const [editingMovie, setEditingMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [searchTerm,setSearchTerm] = useState("")


  const fetchMovies = ()=>{
        axios.get('http://localhost:3000/api/movies')
        .then(res=>{setMovies(res.data)})
        .catch(error => {
            console.error('Error fetching movies:', error)
        })
    }

    useEffect(() => {
    fetchMovies();
  }, [])


  const handleDelete = async(id)=>{
    try{
      await axios.delete(`http://localhost:3000/api/movies/${id}`)
      fetchMovies()
    }catch(error){
      console.error('Error deleting movie:', error)
    }
  }


  const handleToggleWatched = async(movie)=>{
    try{
      await axios.put(`http://localhost:3000/api/movies/${movie._id}`,
        {...movie,
          watched: !movie.watched,
        }
      )
      fetchMovies()
       }catch(error){
         console.error('Error toggling watched status:', error)
       }
   }

  const filteredMovies = movies.filter((movie)=>{
    const matchesGenre = selectedGenre === "All" ||
    (movie.genre && movie.genre.toLowerCase().includes(selectedGenre.toLowerCase()))

    const matchesSearch = 
    movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesGenre && matchesSearch
  })



  return (
    <div className='App'>
      <h1>🎬 Movie Tracker</h1>
      <MovieForm onMovieAdded={fetchMovies} editingMovie={editingMovie} clearEditing={()=>setEditingMovie(null)}/>

        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="search">🔎 Search by Title:</label>
            <input
               type="text"
               id="search"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="e.g. Joker"
               style={{ marginLeft: '10px', padding: '4px', width: '200px' }}
            />
        </div>


        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="genreFilter">🎯 Filter by Genre:</label>
           <select
             id="genreFilter"
             value={selectedGenre}
             onChange={(e) => setSelectedGenre(e.target.value)}
             style={{ marginLeft: '10px' }}
            >
           <option value="All">All</option>
           <option value="Sci-Fi">Sci-Fi</option>
           <option value="Comedy">Comedy</option>
           <option value="Drama">Drama</option>
           <option value="Thriller">Thriller</option>
           <option value="Animation">Animation</option>
           <option value="Biography">Biography</option>
           <option value="Adventure">Adventure</option>
           <option value="Crime">Crime</option>
           <option value="Fantasy">Fantasy</option>
          </select>
        </div>

     <MovieList movies={filteredMovies} onDelete={handleDelete} onEdit={(movie) => setEditingMovie(movie)} onToggleWatched={handleToggleWatched}/>
    </div>
  )
}

export default App

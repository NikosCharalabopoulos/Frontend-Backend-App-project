import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm'
import OnlineSearch from './components/OnlineSearch'
import FilterBar from './components/filterBar'
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
    <div className="App">
    
      <h1>🎬 Movie Tracker</h1>

      <MovieForm 
      onMovieAdded={fetchMovies} 
      editingMovie={editingMovie} 
      clearEditing={()=>setEditingMovie(null)}
      />

      <OnlineSearch onMovieAdded={fetchMovies} />

      <FilterBar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      selectedGenre={selectedGenre}
      onGenreChange={setSelectedGenre}
      />

    
     <MovieList 
     movies={filteredMovies} 
     onDelete={handleDelete} 
     onEdit={(movie) => setEditingMovie(movie)} 
     onToggleWatched={handleToggleWatched}
     />
   
   </div>
  )
}

export default App

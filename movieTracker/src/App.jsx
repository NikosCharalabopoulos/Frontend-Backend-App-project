import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm'
import './App.css'


function App() {
  const [movies, setMovies] = useState([])
  const [editingMovie, setEditingMovie] = useState(null);


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


  return (
    <div className='App'>
      <h1>🎬 Movie Tracker</h1>
      <MovieForm onMovieAdded={fetchMovies} editingMovie={editingMovie} clearEditing={()=>setEditingMovie(null)}/>
     <MovieList movies={movies} onDelete={handleDelete}/>
    </div>
  )
}

export default App

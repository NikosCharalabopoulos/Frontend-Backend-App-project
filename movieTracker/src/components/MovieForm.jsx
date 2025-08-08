import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const MovieForm = ({onMovieAdded,editingMovie,clearEditing})=>{
    const [title,setTitle] = useState("")
    const [genre,setGenre] = useState("")
    const [rating,setRating] = useState("")
    const [description,setDescription] = useState("")
    const [watched,setWatched] = useState(false)

    useEffect(()=>{
        if(editingMovie){
            setTitle(editingMovie.title||"")
            setGenre(editingMovie.genre||"")
            setRating(editingMovie.rating||"")
            setDescription(editingMovie.description||"")
            setWatched(editingMovie.watched||false)
        }
    },[editingMovie])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const movieData = {
         title,
         genre,
         rating: Number(rating),
         description,
         watched
        }
        try{
            if(editingMovie){
                await axios.put(`http://localhost:3000/api/movies/${editingMovie._id}`, movieData)
                clearEditing("")
            }else{
                await axios.post('http://localhost:3000/api/movies',{title,genre,rating: Number(rating),description,watched})
            }

            setTitle("")
            setGenre("")
            setDescription("")
            setRating("")
            setWatched(false)
            onMovieAdded()
            
        }catch(error){
            console.error('Error saving movie:', error)
        }
    }

    return (
        <div className="card">
        <form action="Submit" onSubmit={handleSubmit}>
            
            <input
              value = {title}
              onChange={e=>setTitle(e.target.value)}
              placeholder="Movie Title"
              required
              />

              <input
              value={genre}
              onChange={e=>setGenre(e.target.value)}
              placeholder="Movie Genre"
              />

              <input
              type="number"
              value={rating}
              onChange={e=>setRating(e.target.value)}
              placeholder="Movie Rating (0-10)"
              min = "0"
              max = "10"
              />

              <textarea
              value={description}
              onChange={e=>setDescription(e.target.value)}
              placeholder="Movie Description"
              />

              <label>
                <input
                type="checkbox"
                checked={watched}
                onChange={e=>(setWatched(e.target.checked))}
                />
                Did you watch this?
              </label>
              <button type="submit" className="primary">{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
               {editingMovie && (
                   <button type="button" onClick={clearEditing} className="ghost">
                    Cancel
                   </button>
                )}
              
              
        </form>
        </div>
    )
}



export default MovieForm
import React from "react";
import axios from "axios";
import { useState } from "react";

const MovieForm = ({onMovieAdded})=>{
    const [title,setTitle] = useState("")
    const [genre,setGenre] = useState("")
    const [rating,setRating] = useState("")
    const [description,setDescription] = useState("")
    const [watched,setWatched] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:3000/api/movies',{title,genre,rating: Number(rating),description,watched})
            setTitle("")
            setGenre("")
            setDescription("")
            setRating("")
            setWatched(false)
            onMovieAdded()
        }catch(error){
            console.error(error)
        }
    }

    return (
        <form action="Submit" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
              <button type="submit">Add Movie</button>
              </div>
        </form>
    )
}



export default MovieForm
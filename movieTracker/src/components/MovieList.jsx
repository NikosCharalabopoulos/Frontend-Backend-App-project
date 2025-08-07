import React from "react";
import axios from "axios";


const MovieList = ({movies,onDelete,onEdit})=>{
    
    return (
        <div>
            <h2>My Movies</h2>
            {movies.length === 0 ? (<p>There are no movies</p>) : (
                <ul>
                    {movies.map(movie =>(
                        <li key = {movie._id}>
                            <strong>{movie.title}</strong> — {movie.genre} — Rating: {movie.rating} — {movie.watched ? '✅ Watched' : '❌ Not Watched'}
                            <button onClick={() => onDelete(movie._id)} style={{ marginLeft: '10px' }}>Delete Movie</button>
                            <button onClick={() => onEdit(movie)}>Edit Movie</button>
                        </li>
                    ) )}
                </ul>
            )}
        </div>
    )
}

export default MovieList
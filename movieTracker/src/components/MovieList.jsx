import React from "react";
import axios from "axios";


const MovieList = ({movies,onDelete,onEdit,onToggleWatched})=>{
    
    return (
        <div>
            <h2>My Movies</h2>
            {movies.length === 0 ? (<p>There are no movies</p>) : (
                <ul>
                    {movies.map(movie =>(
                        <li key = {movie._id}>
                            <strong>{movie.title}</strong> — {movie.genre} — Rating: {movie.rating}
                            <label style={{ marginLeft: '10px' }}>
                                <input
                                type="checkbox"
                                checked={movie.watched}
                                onChange={() => onToggleWatched(movie)}
                                />
                                {movie.watched ? 'Watched' : 'Not Watched'}
                            </label>
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
import React from "react";
import axios from "axios";


const MovieList = ({movies,onDelete,onEdit,onToggleWatched})=>{
    
    return (
        <div>
            <h2>My Movies</h2>
            {movies.length === 0 ? (<p>There are no movies</p>) : (
                <ul>
  {movies.map((movie) => (
    <li key={movie._id} className="movie-item">
      <div className="info">
        <span className="title">{movie.title}</span>
        <span>— {movie.genre || '—'}</span>
        <span>— Rating: {movie.rating ?? '—'}</span>
        <span className={`badge ${movie.watched ? 'ok' : 'no'}`}>
          {movie.watched ? 'Watched' : 'Not Watched'}
        </span>
      </div>
      <div className="actions">
        <label>
          <input
            type="checkbox"
            checked={movie.watched}
            onChange={() => onToggleWatched(movie)}
          /> Toggle
        </label>
        <button className="danger" onClick={() => onDelete(movie._id)}>Delete</button>
        <button className="ghost" onClick={() => onEdit(movie)}>Edit</button>
      </div>
    </li>
  ))}
</ul>
            )}
        </div>
    )
}

export default MovieList
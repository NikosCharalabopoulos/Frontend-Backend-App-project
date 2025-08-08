import React from "react";
import { useState } from "react";
import axios from "axios";

const OnlineSearch = ({onMovieAdded}) => {

    const [apiQuery, setApiQuery] = useState('')
    const [apiResults, setApiResults] = useState([])

    const searchOnline = async()=>{
        if (!apiQuery.trim()) return
        try{
            const res = await axios.get(
                `http://localhost:3000/api/external/search?q=${encodeURIComponent(apiQuery)}`
            )
            setApiResults(res.data)
        }catch(error){
            console.error(error)
            setApiResults([])
        }
    }

    return (
         <div style={{ margin: '20px 0' }}>
           <label>🌐 Search online:</label>
           <input
             value={apiQuery}
             onChange={(e) => setApiQuery(e.target.value)}
             placeholder="e.g. Inception"
             style={{ marginLeft: 10, padding: 4, width: 220 }}
           />
          <button onClick={searchOnline} style={{ marginLeft: 8 }}>
             Search
          </button>

         {apiResults.length > 0 && (
           <ul>
             {apiResults.map((r) => (
               <li key={r.imdbID}>
                 {r.Poster && r.Poster !== 'N/A' && (
                   <img
                     src={r.Poster}
                     alt={r.Title}
                     width="40"
                     style={{ verticalAlign: 'middle', marginRight: 8 }}
                   />
              )}
              <strong>{r.Title}</strong> ({r.Year})
                 <button
                   style={{ marginLeft: 8 }}
                   onClick={async () => {
                     try {
                       const details = await axios.get(
                         `http://localhost:3000/api/external/details/${r.imdbID}`
                       );
                       await axios.post(
                         'http://localhost:3000/api/movies',
                         details.data
                        );
                       onMovieAdded(); // ενημέρωση λίστας
                     } catch (err) {
                       console.error('Error adding movie:', err);
                     }
                   }}
                 >
                   ➕ Add to My Movies
                 </button>
               </li>
              ))}
         </ul>
      )}
    </div>
    )
}


export default OnlineSearch
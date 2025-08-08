const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query; 
    if (!q) return res.status(400).json({ message: 'Missing query ?q=' });

    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${process.env.OMDB_API_KEY}`;
    const { data } = await axios.get(url);

    if (data.Response === 'False') {
      return res.status(404).json({ message: data.Error || 'Not found' });
    }

    
    res.json(data.Search); 
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


router.get('/details/:imdbID', async (req, res) => {
  try {
    const { imdbID } = req.params;
    const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&plot=full&apikey=${process.env.OMDB_API_KEY}`;
    const { data } = await axios.get(url);

    if (data.Response === 'False') {
      return res.status(404).json({ message: data.Error || 'Not found' });
    }

    const mapped = {
      title: data.Title,
      genre: data.Genre,            
      rating: Number(data.imdbRating) || 0,
      description: data.Plot,
      watched: false,              
      poster: data.Poster,
      year: data.Year,
      imdbID: data.imdbID,
    };

    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;

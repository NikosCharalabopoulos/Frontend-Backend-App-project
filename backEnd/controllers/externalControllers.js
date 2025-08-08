
const axios = require('axios');

const OMDB_KEY = process.env.OMDB_API_KEY;

const searchOmdb = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Missing query ?q=' });

    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${OMDB_KEY}`;
    const { data } = await axios.get(url);

    if (data.Response === 'False') {
      return res.status(404).json({ message: data.Error || 'Not found' });
    }

    return res.json(data.Search);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const omdbDetails = async (req, res) => {
  try {
    const { imdbID } = req.params;
    if (!imdbID) return res.status(400).json({ message: 'Missing :imdbID' });

    const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&plot=full&apikey=${OMDB_KEY}`;
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

    return res.json(mapped);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { searchOmdb, omdbDetails };

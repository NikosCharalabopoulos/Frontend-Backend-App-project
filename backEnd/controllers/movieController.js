const Movie = require('../models/movieModel')

const getMovies = async(req, res) =>{
    try{
        const movies = await Movie.find()
        res.status(200).json(movies)
    }catch(error){
        res.status(500).json({ message: 'Server Error', error })
    }
}

module.exports = {getMovies}
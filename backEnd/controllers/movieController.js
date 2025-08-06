const Movie = require('../models/movieModel')

const getMovies = async(req, res) =>{
    try{
        const movies = await Movie.find()
        res.status(200).json(movies)
    }catch(error){
        res.status(500).json({ message: 'Server Error', error })
    }
}




const createMovie = async(req,res) =>{
    try{
        const {title, description, genre, rating, watched} = req.body
        
        if(!title){
            return res.status(400).json({ message: 'Title is required' })
        }
        const newMovie = new Movie({
            title,
            description,
            genre,
            rating,
            watched 
        })
        const savedMovie = await newMovie.save()
        res.status(201).json(savedMovie)
    }catch(error){
        res.status(500).json({ message: 'Server Error', error })
    }
}



const updateMovie = async(req,res) =>{
    try{
        const {id} = req.params
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if(!updatedMovie){
            return res.status(404).json({ message: 'Movie not found' })
        }
        res.status(200).json(updatedMovie)
    }catch(error){
        res.status(500).json({message: 'Server error', error})
    }
}




const deleteMovie = async(req,res)=>{
    try{
        const {id} = req.params
        const deletedMovie = await Movie.findByIdAndDelete(id)
        if(!deletedMovie){
            return res.status(404).json({ message: 'Movie not found' })
        }
        res.status(200).json({message: "Movie deleted successfully"})
    }catch(error){
        res.status(500).json({message: "Server error", error})
    }
}





module.exports = {getMovies, createMovie, updateMovie, deleteMovie}
const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
    description: {
    type: String,
    required: false
  },
    genre: {
    type: String,
    required: false
  },
    rating: {
    type: Number,
    min: 0,
    max: 10,
    required: false
  },
    watched: {
    type: Boolean,
    default: false
  },
    createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Movie', movieSchema)
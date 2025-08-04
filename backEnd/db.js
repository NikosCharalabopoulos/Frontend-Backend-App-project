const mongoose = require("mongoose");

const URL = 'mongodb://localhost:27017/movieTracker';
mongoose.connect(URL); 

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;

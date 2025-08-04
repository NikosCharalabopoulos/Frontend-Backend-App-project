const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const db = require('./db.js')
const movieRoutes = require('./routes/movieRoutes')

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/movies', movieRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
const express = require("express")
const cors = require('cors')
const db = require('./db.js')

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
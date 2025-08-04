const express = require("express")
const db = require('./db.js')

const app = express()

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
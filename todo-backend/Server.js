const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routers/todo-router')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = process.env.port || 5000

app.use(express.json())
app.use(cors())

app.use(routes)

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log(`Connected to MongoDB`))
    .catch((err)=>console.log(err))



app.listen(PORT, () => console.log(`Listening on: ${PORT}`))
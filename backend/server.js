// CommonJS modules syntax
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Connect DB
connectDB()

const app = express()

// Middleware to get body data 
app.use(express.json()) // body parser for raw json
app.use(express.urlencoded({ extended: false }))

// Define default routes
app.use('/api/goals', require('./routes/goalRoutes'))

// Middleware to overwrite default Express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
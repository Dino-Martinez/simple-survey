// Requirements
const express = require('express')
const helmet = require('helmet') // Security and HTTP header middleware
const cors = require('cors') // Handling CORS for accessible APIs
const morgan = require('morgan') // Request logging
const compression = require('compression') // GZIP middleware for compressing responses
const handlebars = require('express-handlebars')
const path = require('path')

// App
const app = express()

// View Engine
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static(path.join(__dirname, 'public'))) // Require static assets from public folder
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true })) // Handling form data
app.use(express.json()) // Handling JSON data
app.use(compression())

// Routes
require('./routes/index.js')(app)

// Export App for server/testing
module.exports = app

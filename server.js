const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()

// Bodyparser Middleware
app.use(express.json())


//DB config
const db = config.get('mongoURI')

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then( () => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


//Use Routes

// Items Routes
app.use('/api/items', require('./routes/api/items'))
// Users Routes
app.use('/api/users', require('./routes/api/users'))
//Auth Routes
app.use('/api/auth', require('./routes/api/auth'))


// Serve static assest if we are in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port , () => console.log(`Server started on port ${port}`))

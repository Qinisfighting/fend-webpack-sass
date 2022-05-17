projectData = {};


let path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))



// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/all', (req,res) => {
    res.send(projectData);  
})

app.post('/addData', (req,res) => {
    newEntry = {
    date: req.body.date,
    name: req.body.name,
    temp: req.body.temp,
    }
    projectData = newEntry;
    res.send(projectData)
})

const express = require('express')
const app = express()
const cors = require("cors");

// Use the cors middleware
app.use(cors());

app.get('/greet', function (req, res) {
  res.send('Hello World, My Name is Karthick')
})

app.get('/api/greeting', function (req, res) {
    res.json({message: 'Hello World, from node server'})
})

app.listen(3000, () => {
console.log("server is running in port 3000");
})
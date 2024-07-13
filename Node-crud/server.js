const express = require("express")
const port = 3000;
const app = express()

// GET Method it reads the API

app.get('/menu',(req,res) => {
    const newItem = req.query.newItem
    res.send(`Menu are listed in the pamplet : Medium, Large, ${newItem}`)
});


// POST Method it creates the API it cannot be seen using localhost, it can seen only using POSTMAN tool

app.post('/order',(req,res) => {
    const num = "4"
    // insted of hard coding we can give the following code
    // const num = req.query.num
    // it will help you to add the values in the query param in postman tool
    // it can be used in every crud method

    res.send(`Your order has been place sir: ${num}`)
});

// UPDATE Method it update the API it cannot be seen using localhost, it can seen only using POSTMAN tool

app.put('/order',(req,res) => {
    const num = req.query.num
    res.send(`Your order has been place sir: ${num}`)
});

// DELETE Method it used to delete the API it cannot be seen using localhost, it can seen only using POSTMAN tool

app.delete('/order',(req,res) => {

    res.send(`Your order has been deleted sir:`)
});


app.listen(port,() => {
    console.log(`Server is running at ${port}`)
})
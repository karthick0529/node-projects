1. create a folder with name folderName
2. npm init -y 
3. npm i express
4. npm i mongoose
5. npm i body-parser
6. create a server.js ffile inside the folder and enter the code to check whether it is connected to MongoDB or not.

    const express = require("express"); // for express server
    const mongoose = require("mongoose"); // for mongoose 
    const bodyParser = require("body-parser"); // for parsing the data from body into json 

    const app = express(); 
    app.use(bodyParser.json()); // for using the json which is being parsed

    // for checking whether it is coonceted to MongoDB

    mongoose 
    .connect("mongodb://localhost:27017/Guvi")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting MongoB", err);
    });

7. node server.js 
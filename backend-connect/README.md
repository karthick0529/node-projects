1. create a folder with name folderName
2. npm init -y 
3. npm i express
4. npm i mongoose
5. npm i body-parser
6. create a server.js ffile inside the folder and enter the code to check whether it is connected to MongoDB or not.

Example:

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
8. Create a folder models for storing the collections such as mentor.js/student.js
9. In the collections create a collectionSchema and collectionModel and export the collections created.

Example: 

    const mongoose = require("mongoose"); // mongoose is required

    // creating a schema and entering the sketch of the schema

    const studentSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        mentor:{
            type: mongoose.Schema.Types.ObjectId, // References to ObjectId of the Mentor collection
            ref: "Mentor", // the model to reference
        },
        previousMentor:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Mentor",
            },
        ],
    });

    // Creating the model for the Schema

    const Student = mongoose.model("Student", studentSchema);
    
    // exporting the schema and model created

    module.exports = Student;
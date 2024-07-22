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


10. Create a folder routes inside the main folder and create a index.js file
11. Type the API codes which are nessary to do CRUD operations here 

    -> it will create a collection inside the MongoDB server where we can do our operations.
    -> also export the router

12. Enter the code for using the routes folder inside server.js and declare the necessary path for routes
    
    app.use("/api", routes);

13. run the program using node server.js
14. Enter the necessary data using POSTMAN tool under body -> raw -> json. The data will be entered inside the database.

Example code:

    please check person code inside the models folder

15. .env file is used to hide the sensitive information like MongoDB URI and PORT number

Note: npm install dotenv for installing .env files

    1. we need to create afile with .env 
    2. enter the sensitive details like MONGO_URI and PORT in this file and save it
    3. go to server.js and add the .env file using 
        const dotenv = require("dotenv")
    4. dotenv.config()
    5. create a variable for .env 
        const env = process.env.NODE_ENV || development // this will check where the file is to directed whether .env/production/development

        run using node server.js

    6. If nothing is specified it is given as default we should run it as NODE_env = .env/dev/prod node server.js            

    SAmple code for running 5 = >

        Here's how to do it step-by-step:

            Install the cross-env package (if you haven't already):

            powershell
            Copy code
            npm install cross-env
            Modify your code to load the appropriate .env file based on the NODE_ENV environment variable:

            javascript
            Copy code
            const express = require("express");
            const mongoose = require("mongoose");
            const bodyParser = require("body-parser");
            const routes = require("./routes/index");
            const dotenv = require("dotenv");

            // Load environment variables from .env files
            const env = process.env.NODE_ENV || 'development';
            dotenv.config({ path: `.env.${env}` });

            const app = express();
            app.use(bodyParser.json());

            // Connection to MongoDB
            mongoose
            .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.error("Error connecting to MongoDB", err);
            });

            // Testing console
            console.log("process.env.MONGO_URI", process.env.MONGO_URI);

            app.use("/api", routes);

            const port = process.env.PORT || 3000;
            // Testing console
            console.log("process.env.PORT", process.env.PORT);

            app.listen(port, () => {
            console.log(`Server is running on the port ${port}`);
            });
            Run your script using cross-env to set the NODE_ENV variable:

            powershell
            Copy code
            npx cross-env NODE_ENV=production node server.js
            Using cross-env ensures that the environment variable is set correctly, regardless of the operating system. This should resolve the issue you're encountering with the NODE_ENV variable not being recognized.
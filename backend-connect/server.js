const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://guvi:guvi@guvi.3b7etbf.mongodb.net/Guvi")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting MongoB", err);
  });

  app.use("/api", routes);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
  })

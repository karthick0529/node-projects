const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const dotenv =require("dotenv");

dotenv.config();

// const env = process.env.NODE_ENV
// dotenv.config({path: `.env.${env}`});

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting MongoB", err);
  });

  console.log("process.env.MONGO_URI", process.env.MONGO_URI)
  app.use("/api", routes);

  const port = process.env.PORT || 3000;
  console.log("process.env.PORT", process.env.PORT);
  app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
  })

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env files
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
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

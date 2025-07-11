/**
 * Main server setup file for Task Management API
 * 
 * This Express application provides two main API routes:
 * - /api/auth: Handles user authentication (login, register, etc.)
 * - /api/tasks: Handles task-related operations (CRUD functionality)
 * 
 * Tech Stack:
 * - Express.js: Server framework
 * - MongoDB with Mongoose: Database and ODM
 * - dotenv: Loads environment variables from a .env file
 * - cors: Enables CORS for cross-origin requests
 * - body-parser: Parses incoming JSON request bodies
 * 
 * The server connects to MongoDB using the URI provided in MONGO_URI
 * from the environment configuration. It listens on the port defined
 * in the environment or defaults to port 3000.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/authrouter');
const taskRouter = require('./routes/taskrouter');
const logger = require('./utils/logger'); 

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Cannot connect to MongoDB', err));

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
logger.info("🚀 Server is starting...");

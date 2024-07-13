const express = require("express");
const fs = require("fs");
const path = require("path");

// Define the port number
const port = 4000;

// Create the Express app
const app = express();

// Define the path to the "files" directory
const folderPath = path.join(__dirname, "files");

// Check if the "files" directory exists. If not, create it.
if (!fs.existsSync(folderPath)) {
  console.log("Creating Files Folder");
  fs.mkdirSync(folderPath);
}

// Define the route for creating a new file
app.post("/create-files", (req, res) => {
  // Generate a unique file name
  const timestamp = new Date();
  const fileName = `${timestamp.toISOString().replace(/:/g, "-")}.txt`;
  const filePath = path.join(folderPath, fileName);

  // fs.writeFile method to write the timestamp.toString() value to a file specified by filePath.
  fs.writeFile(filePath, timestamp.toString(), (err) => {
    if (err) {
      console.log("Error creating the file", err);
      return res.status(500).json({ message: `Error writing file - ${err}` });
    }
    // If the file is created successfully, respond with a success message and the file name
    res.json({ message: "File Created Successfully", fileName });
  });
});

// Define a route "/get-files" using Express
app.get("/get-files", (req, res) => {
  // Read the files from the specified folderPath using fs.readdir
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log("Error reading files", err);
      return res.status(500).json({ message: `Error reading files - ${err}` });
    }
    // If successful, respond with a JSON object containing a success message and the list of files
    res.json({ message: "Files retrieved successfully", files });
  });
});

// Start the server
app.listen(port, (req, res) => {
  console.log(`Server is running in the port: ${port}`);
});

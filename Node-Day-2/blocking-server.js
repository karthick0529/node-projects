const http = require("http");
const port = 3000;
let requestCount = 0;

// Blocking delay function
function sleep(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {
    // console.log("Do nothing");
  }
}

const server = http.createServer((req, res) => {
  requestCount++;
  if (req.url === "/") {
    sleep(7000); // Simulate a 5 second blocking operation
    res.end(`Hello World!\nRequest count: ${requestCount}\n`);
  } else {
    res.end("Not Found\n");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

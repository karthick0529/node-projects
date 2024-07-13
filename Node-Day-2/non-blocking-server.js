const http = require("http");
const port = 3001;

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;
  if (req.url === "/") {
    // simulate a 5-seconf non-blocking operation
    setTimeout(() => {
      res.end(`Hello World!\nRequest count: ${requestCount}\n`);
    }, 5000);
  } else {
    res.end("Not Found\n");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

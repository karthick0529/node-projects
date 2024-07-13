const http = require("http");
const port = 3004;
let requestCount = 0;

// Blocking delay function
function sleep(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {
    console.log("Do nothing until cake is ready!!!!");
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log(`STEP 1: Cake is being made - mixing all ingredients!\n`);
    console.log(
      `STEP 2: Cake is going to get baked in oven for 5 seconds...\n`
    );
    sleep(7000); // Simulate a 5 second blocking operation
    console.log(`STEP 3: Cake is ready!!!!\n`);
    console.log("STEP 4: Prepare coffee and drink!!\n");
  } else {
    res.end("Not Found\n");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

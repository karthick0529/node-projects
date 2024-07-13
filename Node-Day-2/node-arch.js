const http = require("http");
const port = 3003;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log(`STEP 1: Cake is being made - mixing all ingredients!\n`);
    console.log(
      `STEP 2: Cake is going to get baked in oven for 5 seconds...\n`
    );
    // simulate a 5-seconf non-blocking operation
    setTimeout(() => {
      console.log(`STEP 3: Cake is ready!!!!\n`);
    }, 10000);
    console.log("STEP 4: Prepare coffee and drink!!\n");
  } else {
    res.end("Not Found\n");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

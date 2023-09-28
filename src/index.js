const http = require("http");

const { getProducts } = require("./controllers/productController");

const port = 5000;

const server = http.createServer((request, response) => {
  if (request.url === "/api/products") {
    getProducts(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
  }
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

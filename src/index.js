const http = require("http");

const { getProducts, getProduct } = require("./controllers/productController");

const port = 5000;

const server = http.createServer(async (request, response) => {
  if (request.url === "/api/products") {
    await getProducts(request, response);
  } else if (
    request.url.match(/\/api\/products\/([0-9]+)/) &&
    request.method === "GET"
  ) {
    const productId = request.url.split("/")[3]; //api/products/132
    await getProduct(request, response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
  }
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

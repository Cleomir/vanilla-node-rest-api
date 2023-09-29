const http = require("http");

const {
  getProducts,
  createProduct,
  getProduct,
} = require("./controllers/productController");

const port = 5000;

const server = http.createServer(async (request, response) => {
  const { url, method } = request;
  if (url === "/api/products" && method === "GET") {
    await getProducts(request, response);
  } else if (url === "/api/products" && method === "POST") {
    await createProduct(request, response);
  } else if (url.match(/\/api\/products\/([0-9]+)/) && method === "GET") {
    const productId = url.split("/")[3]; //api/products/132
    await getProduct(request, response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
  }
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

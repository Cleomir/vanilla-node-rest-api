const http = require("http");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const port = 5000;

const server = http.createServer(async (request, response) => {
  const { url, method } = request;

  try {
    if (url === "/api/products" && method === "GET") {
      await getProducts(request, response);
    } else if (url === "/api/products" && method === "POST") {
      await createProduct(request, response);
    } else if (url.match(/\/api\/products\/(\d|\w)+/g) && method === "PATCH") {
      const productId = url.split("/")[3]; // /api/products/132
      await updateProduct(request, response, productId);
    } else if (url.match(/\/api\/products\/(\d|\w)+/g) && method === "GET") {
      const productId = url.split("/")[3]; // /api/products/132
      await getProduct(request, response, productId);
    } else if (url.match(/\/api\/products\/(\d|\w)+/g) && method === "DELETE") {
      const productId = url.split("/")[3]; // /api/products/132
      await deleteProduct(request, response, productId);
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
});
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

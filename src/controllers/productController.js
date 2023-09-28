const Product = require("../models/productModel");

// GET /api/products
const getProducts = async (request, response) => {
  try {
    const products = await Product.findAll();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

// GET /api/product
const getProduct = async (request, response, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(product));
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
};

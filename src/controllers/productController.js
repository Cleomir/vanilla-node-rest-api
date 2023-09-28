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

module.exports = {
  getProducts,
};

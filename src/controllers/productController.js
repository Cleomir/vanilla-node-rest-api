const Product = require("../models/productModel");
const { parseBodyData } = require("../utils");

// GET /api/products
const getProducts = async (request, response) => {
  try {
    const products = await Product.findAll();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(products));
  } catch (error) {
    throw error;
  }
};

// POST /api/products
const createProduct = async (request, response) => {
  try {
    const { name, description, price, quantity } = await parseBodyData(request);
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
    });

    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(newProduct));
  } catch (error) {
    throw error;
  }
};

// PATCH /api/products/:id
const updateProduct = async (request, response, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const { name, description, price, quantity } = await parseBodyData(
        request
      );
      const updatedProduct = await Product.update(
        {
          name: name || product.name,
          description: description || product.description,
          price: price || product.price,
          quantity: quantity || product.quantity,
        },
        id
      );

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    throw error;
  }
};

// GET /api/product/:id
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
    throw error;
  }
};

// DELETE /api/product/:id
const deleteProduct = async (request, response, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      await Product.remove(id);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

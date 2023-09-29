const { v4: uuidv4 } = require("uuid");

const products = require("../../data/products");
const { writeDataToFile } = require("../utils");

const findAll = async () => {
  return products;
};

const create = async (product) => {
  const newProduct = { id: uuidv4(), ...product };

  products.push(newProduct);
  writeDataToFile("./data/products.json", products);

  return newProduct;
};

const update = async (product, id) => {
  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = { id, ...product };

  writeDataToFile("./data/products.json", products);

  return products[productIndex];
};

const findById = async (id) => {
  const product = products.find((product) => product.id === id);

  return product;
};

const remove = async (id) => {
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);

  writeDataToFile("./data/products.json", products);
};

module.exports = {
  findAll,
  create,
  update,
  findById,
  remove,
};

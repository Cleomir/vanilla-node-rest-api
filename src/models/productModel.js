const products = require("../../data/products");

const findAll = async () => {
  return products;
};

const findById = async (id) => {
  const product = products.find((product) => product.id === id);

  return product;
};

module.exports = {
  findAll,
  findById,
};

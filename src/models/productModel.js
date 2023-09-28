const products = require("../../data/products");

const findAll = async () => {
  return products;
};

module.exports = {
  findAll,
};

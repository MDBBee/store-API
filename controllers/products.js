const Product = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ sucess: true, data: "All static products!" });
};
const getAllProducts = async (req, res) => {
  console.log(req.query);

  const products = await Product.find(req.query);
  res.status(200).json({ products, noHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };

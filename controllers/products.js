const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const prods = await Product.find({ name: { $regex: "ba", $options: "i" } });
  res.status(200).json({ noht: prods.length, sucess: true, data: prods });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryOBJ = {};

  if (featured) {
    queryOBJ.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryOBJ.company = company;
  }

  if (name) {
    queryOBJ.name = { $regex: name, $options: "i" };
  }
  let results = Product.find(queryOBJ);

  if (sort) {
    const sorta = sort.split(",").join(" ");
    results = results.sort(sorta);
  }

  if (fields) {
    const fielda = fields.split(",").join(" ");
    console.log(fielda);
    results = results.select(fielda);
  }

  if (numericFilters) {
  }
  const products = await results;

  res.status(200).json({ noHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };

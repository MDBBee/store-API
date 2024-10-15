const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const prods = await Product.find({ price: { $gt: 100 } });
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
    results = results.select(fielda);
  }

  if (numericFilters) {
    console.log(numericFilters);
    const mapOptions = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };

    // {price: { $gt: 100 }}
    const regex = /\b(<|<=|=|>|>=)\b/g;
    numericFilters
      .replace(regex, (match) => `-${mapOptions[match]}-`)
      .split(",")
      .forEach((opt) => {
        const options = ["price", "rating"];
        const [field, operator, value] = opt.split("-");

        if (options.includes(field)) {
          queryOBJ[field] = { [operator]: Number(value) };
        }
      });

    results = Product.find(queryOBJ);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  results.skip(skip).limit(limit);

  const products = await results;

  res.status(200).json({ noHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };

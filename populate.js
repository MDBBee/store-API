// const mongoose = require("mongoose");
const connectDB = require("./db/connect");
require("dotenv").config();
const products = require("./products.json");
const Product = require("./models/product");

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("Sucess!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();

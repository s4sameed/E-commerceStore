const mongoose = require("mongoose");

const ProductsInCartSchema = new mongoose.Schema({
    product: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
  });
  
  module.exports = mongoose.model("ProductsInCart", ProductsInCartSchema);
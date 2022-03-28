const mongoose = require("mongoose");
const ProductsInCart = require("./productsInCart").schema

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductsInCart],
    transaction_id: {},
    amount: { type: Number },
    address: {type: String},
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Recieved"]
    },
    updated: Date,
    user: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);

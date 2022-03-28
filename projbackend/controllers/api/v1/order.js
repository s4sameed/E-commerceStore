const Order = require("../../../models/order");
const ProductsInCart = require("../../../models/productsInCart");

module.exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
      .populate("products.product", "name price")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "NO order found"
          });
        }
        req.order = order;
        next();
    });
};
  


module.exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save your order"
        });
      }
      res.json(order);
    });
};
  



module.exports.getAllOrders = (req, res) => {
    Order.find()
      .populate("user", "_id name")
      .exec((err, orders) => {
        if (err) {
          return res.status(400).json({
            error: "No orders found"
          });
        }
        res.json(orders);
      });
  };
  


module.exports.updateStatus = (req, res) => {
    Order.update(
      { _id: req.body.orderId },
      { $set: { status: req.body.status } },
      (err, order) => {
        if (err) {
          return res.status(400).json({
            error: "Cannot update order status"
          });
        }
        res.json(order);
    }
)};
  
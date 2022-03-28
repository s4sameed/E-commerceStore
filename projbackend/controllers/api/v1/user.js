const User = require("../../../models/user");
const Order = require("../../../models/order");

module.exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found"
        });
      }
      req.profile = user;
      next();
    });
};


module.exports.getUser = (req, res) => {
    return res.json({
        name: req.profile.name,
        email: req.profile.email,
        id: req.profile._id,
        role: req.profile.role,
    });
};



module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to update"
          });
        }
        
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
      }
    );
};
  


module.exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(order);
      });
};
  


module.exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
      purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      });
    });
  
    //store this in DB
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to update purchase list"
          });
        }
        next();
      }
    );
};
  
  
  
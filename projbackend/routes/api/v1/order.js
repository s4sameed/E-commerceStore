const express = require('express');
const router = express.Router();

const {isAdmin, isAuthenticated, isSignedIn} = require("../../../controllers/api/v1/auth");
const {getUserById, pushOrderInPurchaseList} = require("../../../controllers/api/v1/user");
//TODO:
//const {updateStock} = require("../../../controllers/api/v1/product")

const {getOrderById, createOrder, getAllOrders, updateStatus} = require("../../../controllers/api/v1/order");


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//routes

//create
router.post(
    "/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    //updateStock,
    createOrder
);
  

//read
router.get(
    "/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);


//update order status
router.put(
    "/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);
  
  


module.exports = router;
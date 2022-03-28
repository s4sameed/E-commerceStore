const express = require('express');
const router = express.Router();

const {getProductById, createProduct, getProduct, updateProduct, deleteProduct, getAllProducts} = require("../../../controllers/api/v1/product")

const {isAdmin, isAuthenticated, isSignedIn} = require("../../../controllers/api/v1/auth");
const {getUserById} = require("../../../controllers/api/v1/user");

//params 
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes

//create
router.post(
    "/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

//read
router.get("/fetch/:productId", getProduct);


//update route
router.put(
    "/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);


//delete route
router.delete(
    "/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);
  

//listing route
router.get("/", getAllProducts);


module.exports = router;
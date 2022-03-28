const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../../../controllers/api/v1/category");

const {isAdmin, isAuthenticated, isSignedIn} = require("../../../controllers/api/v1/auth");
const {getUserById} = require("../../../controllers/api/v1/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//routes

//create
router.post(
    "/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);


//read
router.get("/fetch/:categoryId", getCategory);
router.get("/fetch/all/categories", getAllCategory);

  

//update
router.put(
    "/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);
  


//delete
router.delete(
    "/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);
  



module.exports = router;
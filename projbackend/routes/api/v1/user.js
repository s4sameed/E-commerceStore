const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/api/v1/user")

const { isSignedIn, isAuthenticated, isAdmin } = require('../../../controllers/api/v1/auth');

router.param("userId", userController.getUserById);


router.get("/fetch/:userId", isSignedIn, isAuthenticated, userController.getUser);


router.put("/fetch/:userId", isSignedIn, isAuthenticated, userController.updateUser);


router.get(
    "/orders/:userId",
    isSignedIn,
    isAuthenticated,
    userController.userPurchaseList
);
  


module.exports = router;

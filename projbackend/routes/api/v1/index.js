const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/category', require('./category'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));
router.use('/payment', require('./payment'));


module.exports = router;
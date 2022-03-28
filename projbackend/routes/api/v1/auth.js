const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const authControllers = require('../../../controllers/api/v1/auth');

router.post('/sign_up',
    [
        check("name").notEmpty().withMessage('Name required'),
        check("email").normalizeEmail().isEmail().withMessage('Enter valid email'),
        check("password").isLength({ min: 8 }).withMessage('Your password must be 8 character long')
    ],
authControllers.signup);



router.post('/sign_in',
    [
        check("email").notEmpty().isEmail().withMessage('Email required'),
        check("password").notEmpty().withMessage('Password required')
    ],
authControllers.signin);


router.get('/sign_out', authControllers.signout);

router.get('/test', authControllers.isSignedIn, (req, res)=>{
    res.json(req.auth)
})


module.exports = router;
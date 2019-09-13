const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                message: 'User Registered'
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;
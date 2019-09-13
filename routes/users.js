const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
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
    const username = req.body.user_name;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) =>{
        if(err) throw err;
        if(!user){
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 Week
                })

                res.json({
                    success: true,
                    token: 'BEARER ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        user_name: user.user_name,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Wrong Password'
                })
            }
        });
    })
});


// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;
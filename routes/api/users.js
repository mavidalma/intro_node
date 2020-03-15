'use strict';

var express = require('express');
var router = express.Router();
const User = require('../../models/User');

router.get('/login', async(req, res, next) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        const validated = await User.find({username, password});

        if (validated[0] === undefined) {
            const err = new Error('user not found or password incorrect');
            err.status = 404;
            return next(err);
          }

        //set cookie with user id to give access to user's ads (to modify or delete)

        res.json({validated})

    } catch(err) {
        next(err);
    }
});

router.post('/register', async(req, res, next) => {
    try {

    const username = req.body.username;
    const password = req.body.password;
    const user = new User({username, password});
    const newUser = await user.save();


    res.json({response: "success", newUser});
    } catch(err) {
        next(err);
    }
});

module.exports = router;
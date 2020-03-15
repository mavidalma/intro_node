'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    ads: Array,
});

const User = mongoose.model('User',userSchema);

module.exports = User;
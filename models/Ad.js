'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: mongoose.Schema.Types.Mixed,
    picture: Object,
    type: String,
    city: String 
});

const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;
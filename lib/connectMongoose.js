'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

mongoose.connect('mongodb://heroku_x5vq8xjz:s0padecarac0l@ds143293.mlab.com:43293/heroku_x5vq8xjz', { useNewUrlParser: true});

conn.on('open', () => {
  console.log('connected to ' + conn.name);
});

conn.on('error', err => {
  console.error('connection error ', err);
});

module.exports = conn;

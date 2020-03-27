var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */

router.get('/', async function(req, res, next) {
  try {
    res.render('index', {});
  } catch(err) {
      next(err);
  }
});

module.exports = router;

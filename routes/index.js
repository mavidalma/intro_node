var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const query = {};

    req.query.title ? query.title = req.query.title : "";
    req.query.city ? query.city = req.query.city : "";
    req.query.type ? query.type = req.query.type : "";
    req.query.description ? query.$text = {$search: req.query.description} : "";

    if (req.query.tags) {
      const tagsArray = req.query.tags.split(" ");
      query.tags = {$in: tagsArray}
    }

    if(req.query.price) {
    const priceSplited = req.query.price.split("-");
    priceSplited[0] > 0 ? query.price = {$gt: priceSplited[0]} : query.price = {$gt: 0};
    priceSplited[1] > 0 ? query.price.$lt = priceSplited[1] : "";
    }

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const select = req.query.select;

    const ads = await Ad.filter(query, limit, skip, sort, select);
    res.render('index', { 
      title: 'AnunciaLOL',
      ads 
    });
  } catch(err) {
      next(err);
  }
});

module.exports = router;

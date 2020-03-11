'use strict';

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');

//post an ad
router.post('/ad', async (req, res, next) => {
    try {
     const adData =  req.body;
     const ad = new Ad(adData)
     const savedAd = await ad.save();

     res.json({result:savedAd});

    } catch(err) {
        next(err)
    }
  
  });

  module.exports = router;
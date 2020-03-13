'use strict';

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const multer = require('multer');
const upload = multer({dest: './public/ad_pics/'})

//show ads
router.get('/', async(req, res, next) => {
    try {
        const ads = await Ad.find();
        res.json({ads})
    } catch(err) {
        next(err);
    }
 })

 //post a pic
 router.post('/pic', upload.single('photo'), async(req, res, next) => {
    try {
     const picture = req.file;

     res.json({result:picture});

    } catch(err) {
        next(err)
    }
  
  });


 //post ad with pic
 /*
 router.post('/create', upload.array('pictures', 4), async function(req, res, next) {
    try {
     const adData =  req.body;
     const pictures = req.files.destination;
     console.log(pictures);
     console.log(req.files.destination)
     const ad = new Ad(adData, pictures)
     const savedAd = await ad.save();

     res.json({result:savedAd});

    } catch(err) {
        next(err)
    }
  
  });*/

  router.post('/create', upload.single('photo'), async function(req, res, next) {
    try {
     const adData =  req.body;
     const photo = req.file.path;
     const ad = new Ad({...adData, photo})
     const savedAd = await ad.save();

     res.json({result:savedAd});

    } catch(err) {
        next(err)
    }
  
  });

//post an ad
/*
router.post('/create', async (req, res, next) => {
    try {
     const adData =  req.body;
     const ad = new Ad(adData)
     const savedAd = await ad.save();

     res.json({result:savedAd});

    } catch(err) {
        next(err)
    }
  
  });*/

  //update an Ad

  router.put('/:id', async (req, res, next) => {
      try{
        const adData = req.body;
        const _id = req.params.id;
        const updatedAd = await Ad.findOneAndUpdate(_id, adData, {new:true});
        res.json({success: `Ad ${_id} updated`, changes: updatedAd})
      } catch(err) {
          next(err);
;      }
  });

  router.delete('/:id', async (req, res, next) => {
    try{
        const _id = req.params.id
        const erased = await Ad.deleteOne({_id});
        console.log(erased);
        res.json({result: "OK", "Ad removed": _id})
    } catch(err) {
        next(err)
    }
})


  module.exports = router;
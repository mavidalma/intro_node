'use strict';

var express = require('express');
var router = express.Router();
const Ad = require('../../models/Ad');
const multer = require('multer');
const upload = multer({dest: './public/ad_pics/'})


//cookie checker

router.all('*', (req, res, next) => {
  console.log('Cookies: ', req.cookies);
  
  if (!req.cookies.user) {
    const err = new Error('user not logged');
    err.status = 401;
    return next(err);
  }
  next();

})

//show ads
router.get('/', async(req, res, next) => {
    try {
        const ads = await Ad.find();
        res.json({ads})
    } catch(err) {
        next(err);
    }
 })

 //get unique ad

 router.get('/:id', async(req, res, next) => {
  try {
      const _id = req.params.id;
      const ads = await Ad.findOne({_id});
      res.json({ads})
  } catch(err) {
      next(err);
  }
})


// Post Ad

  router.post('/create', upload.fields([{name: 'cover', maxCount: 1}, {name: 'pictures', maxCount: 8}]), async function(req, res, next) {
    try {
     const adData =  req.body;
     const cover = req.files.cover ? req.files.cover[0].path : "";
     const pictures = req.files.pictures ? req.files.pictures.map(item => item.path) : [];

     const ad = new Ad({...adData, pictures, cover})
     const savedAd = await ad.save();

     res.json({result:savedAd});

     //ad user id to ad

    } catch(err) {
        next(err)
    }
  
  });

  //update an Ad

  router.put('/:id', async (req, res, next) => {
      try{
        const adData = req.body;
        const _id = req.params.id;

        //cross check userid on ad and user cookie to alow update

        const updatedAd = await Ad.findOneAndUpdate(_id, adData, {new:true});
        res.json({success: `Ad ${_id} updated`, changes: updatedAd})
      } catch(err) {
          next(err);
;      }
  });

   //update a cover of an ad
 router.post('/cover/:id', upload.single('cover'), async(req, res, next) => {
  try {

    //cross check userid on ad and user cookie to alow update
    const _id = req.params.id;
    const cover = {"cover": req.file.path};
    console.log(cover);

    const updatedAd = await Ad.findOneAndUpdate(_id, cover, {new:false});
    res.json({success: `Ad ${_id} updated`, changes: updatedAd})
  
  } catch(err) {
      next(err)
  }

});

   //update pictures of an ad
   router.post('/pics/:id', upload.array('pictures', 8), async(req, res, next) => {
    try {
      //cross check userid on ad and user cookie to alow update
      const _id = req.params.id;
      const pictures = {"pictures": req.files.map(item => item.path)};
      const updatedAd = await Ad.findOneAndUpdate(_id, pictures, {new:true});
      res.json({success: `Ad ${_id} updated`, changes: updatedAd})
    
    } catch(err) {
        next(err)
    }
  
  });

  router.delete('/:id', async (req, res, next) => {
    try{
      //cross check userid on ad and user cookie to alow update
        const _id = req.params.id
        const erased = await Ad.deleteOne({_id});
        console.log(erased);
        res.json({result: "OK", "Ad removed": _id})
    } catch(err) {
        next(err)
    }
})


  module.exports = router;
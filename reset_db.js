'use strict';

const conn = require('./lib/connectMongoose');
const Ad = require('./models/Ad');
const User = require('./models/User');
//require('mongodb');

conn.once('open', async() => {
    try{
       await initAds();
       await initUsers();
       //db.ads.createIndex({description: 'text'});
       conn.close();
    
    } catch(err) {
        console.error("there has been an error reinitializing the DB: ", err);
        process.exit(1);
    }
})

const initAds = async() => {
 await Ad.deleteMany();
 await Ad.insertMany([
    {
        "_id": "5e6bf231992d1b176ff18e33",
        "title": "Peluche",
        "price": 6,
        "city": "Madrid",
        "description": "A log in the lake",
        "tags": [],
        "user": "5e6e8e074763f31a1ad53674"
    },
    {
        "_id": "5e6959c1b244f42c599d014d",
        "title": "cabaña",
        "price": 6000,
        "city": "Vigo",
        "description": "A log in the lake",
        "tags": ["lifestyle"],
        "user": "5e6e8e074763f31a1ad53674"
    },
 ]);
};

const initUsers = async() => {
    await User.deleteMany();
    await User.insertMany([
        {
            "_id": "5e6e8e074763f31a1ad53674",
            "username": "Admin",
            "password": "admin",
        }
    ])
}


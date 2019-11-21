'use strict';

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require('https');
const request = require('request');

const User = require('../models/User');
const Object = require('../models/Object');


const bcryptSalt = 10;

const DisplayedObjectInfo = require("../models/DisplayedObjectInfo");

mongoose.connect('mongodb://localhost/art-quest');
//get information from files

const scrapingdata = "scrapedata/complete.txt";

fs.readFile(scrapingdata, 'utf8', (err, data) => {
  if (err) throw err;
  let artworks = JSON.parse(data);
  DisplayedObjectInfo.insertMany(artworks)
    .then(documents => {
      console.log("success");
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    })
});

// User.deleteMany()
//   .then(() => User.create(users))
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     mongoose.disconnect();
//     throw err;
//   });
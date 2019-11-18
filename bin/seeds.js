'use strict';

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require('https');
const User = require('../models/User');

const bcryptSalt = 10;

function download(url, filepath) {
  const file = fs.createWriteStream(filepath);
  const request = https.get(url, response => {
    response.pipe(file);
  });
}

// mongoose
//   .connect('mongodb://localhost/art-quest', { useNewUrlParser: true })
//   .then(x => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err);
//   });

let users = [
  // TODO
];

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

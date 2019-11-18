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

function download(url, filepath) {
  const file = fs.createWriteStream(filepath);
  const request = https.get(url, response => {
    response.pipe(file);
  });
}

const fullMetCollection = JSON.parse(
  JSON.stringify(require('../met_collection_DB/full-met-collection.json'))
);

const onDisplayIDs = JSON.parse(
  JSON.stringify(require('../met_collection_DB/onDisplayObjectIDs.json'))
);

function filterCollectionJSON(collection, displayedObjs) {
  console.log('Beginning filter.');

  const writeStream = fs.createWriteStream('onDisplayMetCollection.txt', {
    flags: 'a',
  });
  writeStream.on('error', err => console.log(err));
  writeStream.write(
    JSON.stringify(
      collection.filter(object => displayedObjs.includes(object['Object ID']))
    )
  );
  console.log('done');
}
// filterCollectionJSON(fullMetCollection, onDisplayIDs);

mongoose
  .connect('mongodb://localhost/art-quest', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Object.insertMany(fullMetCollection);
  })
  .then(() => {
    console.log('Finished seeding collection. Closing mongoose connection...');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

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

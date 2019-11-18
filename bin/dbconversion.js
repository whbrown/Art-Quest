const csv = require('csvtojson');
const fs = require('fs');
const request = require('request');
const http = require('http');

const csvFilePath = './met_collection_DB/full-met-collection.csv';
const jsonFilePath = `./met_collection_DB/full-met-collection.json`;

const readStream = fs.createReadStream(csvFilePath);

http
  .createServer(function(req, res) {
    // This opens up the writeable stream to `output`
    let writeStream = fs.createWriteStream(jsonFilePath);

    readStream.pipe(csv()).pipe(writeStream);

    writeStream.on('error', function(err) {
      console.error(err);
      fs.unlink(jsonFilePath);
    });
  })
  .listen(8080);

// csv()
//   .fromFile(csvFilePath)
//   .then(jsonObj => {
//     fs.appendFile(jsonFilePath, jsonObj, err => {
//       if (err) throw err;
//       console.log('Saved!');
//     });
//   })
//   .catch(err => console.error(err));

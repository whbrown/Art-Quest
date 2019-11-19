const csv = require('csvtojson');
const fs = require('fs');
const request = require('request');
const http = require('http');

const csvFilePath = './met_collection_DB/full-met-collection.csv';
const jsonFilePath = `./met_collection_DB/full-met-collection.json`;

/*
http
  .createServer((req, res) => {
    // This opens up the writeable stream to `output`
    const readStream = fs.createReadStream(csvFilePath);
    const writeStream = fs.createWriteStream(jsonFilePath);

    writeStream.on('pipe', () => {
      console.log('Began piping to writer.');
    });

    readStream.pipe().pipe(writeStream);

    writeStream.on('error', function(err) {
      console.error(err);
      fs.unlink(jsonFilePath);
    });
    writeStream.on('finish', () => {
      console.log(`Finished converting csv to json at ${jsonFilePath}`);
    });
  })
  .listen(8080);
<<<<<<< HEAD
*/
=======
*/
>>>>>>> 0c105d356f5e51a2c4d6effbbb79879fb3de6167

// run test scraping with with 'node --http-parser=legacy scraper/scraper.js'
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

let testArray = [
  7984,
  7994,
  8029,
  8007,
  8025,
  8030,
  8031,
  8018,
  7999,
  8016,
  7989,
  7996,
  7982,
  8008,
  8023,
  8019,
  7985,
  8005,
  7988,
  7990,
  8013,
  8022,
  8026,
  7995,
  8012,
  8000,
  7992,
  8024,
  8021,
  7986,
  8020,
  8001,
  8006,
  7983,
  8009,
  7993,
  8002,
  8010,
  7991,
  8014,
  8075,
  8084,
  8073,
  8036,
  8054,
  8040,
  8070,
  8056,
  8077,
  8069,
  8042,
  8035,
  8048,
  8049,
  8050,
  8041,
  8037,
  8079,
  8083,
  8043,
  8033,
  8066,
  8076,
  8067,
  8038,
  8074,
  8071,
  8078,
  8044,
  8034,
  8065,
  8080,
  8047,
  8072,
  8045,
  8052,
  7886,
  7884,
  7881,
  7913,
  7911,
  7905,
  7915,
  7921,
  7927,
  7928,
  7902,
  7883,
  7887,
  7888,
  7914,
  7885,
  7889,
  7882,
  7926,
  7890,
  7903,
  7916,
  7923,
  7930,
];

let counter = 0;
let arrayLength = testArray.length;

let stream = fs.createWriteStream('itemLocationsDescriptions.txt', {
  flags: 'a',
});

const getLocationDescription = objectId =>
  axios
    .get(`https://www.metmuseum.org/art/collection/search/${objectId}`)
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        const description = $('.artwork__intro__desc').text();
        const location = $('.artwork__location--gallery').text();
        stream.write(
          `${JSON.stringify({
            objectId,
            location,
            description: description.replace(/^\s+|\s+$/g, ''),
          })},`
        );
      }
    })
    .catch(err => {
      console.log(err);
    });

let testRetrieval = setInterval(() => {
  getLocationDescription(testArray[counter]);
  counter += 1;
  if (counter === arrayLength) {
    stream.end();
    clearInterval(testRetrieval);
  }
}, 1000);

const getOnDisplayItems = () => {
  axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=*`
    )
    .then(response => {
      let OnDisplayItemIds = response.data.objectIDs;
      console.log(OnDisplayItemIds);
    })
    .catch(err => {
      console.log(err);
    });
};
// getLocationDescription(`https://www.metmuseum.org/art/collection/search/436524`);
// getOnDisplayItems()

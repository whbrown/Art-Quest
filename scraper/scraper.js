// run test scraping with with 'node --http-parser=legacy scraper/scraper.js'
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

let counter = 0;

const getOnDisplayItems = () => {
  return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=*`)
  .then(response => {
    let OnDisplayItemIds = response.data.objectIDs;
    console.log(OnDisplayItemIds);
    let arrayLength = OnDisplayItemIds.length;
    console.log(arrayLength);
    
    let retrieval = setInterval(() => {
      getLocationDescription(OnDisplayItemIds[counter]);
      counter +=1;
      if (counter === arrayLength) {
        stream.end();
        clearInterval(retrieval);
      }
    }, 1000);
  })
  .catch(err => {
    console.log(err)
  })
}

var stream = fs.createWriteStream("itemLocationsDescriptions.txt", {flags:'a'});

const getLocationDescription = (objectId) => {
  return axios.get(`https://www.metmuseum.org/art/collection/search/${objectId}`)
  .then(response => {
    if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const description = $(".artwork__intro__desc").text()
      const location =  $(".artwork__location--gallery").text()
      console.log(description, location);
      stream.write(JSON.stringify({
        objectId: objectId,
        location: location,
        description: description.replace(/^\s+|\s+$/g, '')
      }) + "\n");
    }  
  })
  .catch(err => {
    console.log(err)
  })
}

//getLocationDescription(`https://www.metmuseum.org/art/collection/search/436524`);
getOnDisplayItems();

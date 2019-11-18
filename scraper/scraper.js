const axios = require('axios');
const cheerio = require('cheerio');
let testArray= [7984, 7994, 8029, 8007, 8025, 8030, 8031, 8018, 7999, 8016];
let resultArray = []
/*
const testRetrieval = () => {
  Promise.all(testArray.map(item => {
    return getLocationDescription(item);
  })).then(res => console.log(res)).catch(err => console.log(err))
}
*/

/*
const getOnDisplayItems = () => {
  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=*`)
    .then(response => {
      let OnDisplayItemIds = response.data.objectIDs;
      console.log(OnDisplayItemIds);
    })
    .catch(err => {
      console.log(err)
    })
}
*/
const getLocationDescription = (objectId) => {
  return axios.get(`https://www.metmuseum.org/art/collection/search/${objectId}`)
      .then(response => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          const description = $(".artwork__intro__desc").text()
          const location =  $(".artwork__location--gallery").text()
          return {
            objectId: objectId,
            location: location,
            description: description.replace(/^\s+|\s+$/g, '')
          }
        }  
      })
      .catch(err => {
        console.log(err)
      })
}

//getLocationDescription(`https://www.metmuseum.org/art/collection/search/436524`);
//getOnDisplayItems()
testRetrieval()
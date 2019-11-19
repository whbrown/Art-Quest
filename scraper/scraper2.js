const axios = require('axios');
const cheerio = require('cheerio');
let testArray= [7984, 7994, 8029, 8007, 8025, 8030, 8031, 8018, 7999, 8016];

const getLocationDescription = async(objectId) => {
  try {
    const html = await axios.get(`https://www.metmuseum.org/art/collection/search/${objectId}`)
    const $ = cheerio.load(html.data);
    const description = $(".artwork__intro__desc").text()
    const location =  $(".artwork__location--gallery").text()
    //console.log(location)
    return {
      objectId: objectId,
      location: location,
      description: description.replace(/^\s+|\s+$/g, '')
    }
  }
      /*.then(response => {
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
      })*/
    catch(err) {
      console.log(err)
    }
}

const testRetrieval = async() => {
  let resultArray = testArray.map(async item => {
    const xxy = await getLocationDescription(item)
    //console.log(xxy);
    return xxy;
  })
  console.log(resultArray);
  // resultArray = Promise.all(resultArray);
// resultArray.then(res=>{

//   console.log(res);
// })
return resultArray;
}

let y = Promise.all(testRetrieval());
console.log(y);

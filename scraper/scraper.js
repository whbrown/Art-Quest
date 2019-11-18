const axios = require('axios');
const cheerio = require('cheerio');


const getLocationDescription = (objectLink) => {
  axios.get(`${objectLink}`)
      .then(response => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          console.log($(".artwork__intro__desc").text());
        }  
      })
      .catch(err => {
        console.log(err)
      })
}

getLocationDescription(`https://www.metmuseum.org/art/collection/search/436524`);
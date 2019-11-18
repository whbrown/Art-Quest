const axios = require('axios');

const getDescriptionAndLocation = (objectLink) => {
  axios
  .get(`${objectLink}`)
  .then(response => {
    console.log("received request");  
    console.log(response.data);

  })
  .catch(err => {
    console.log(err);
  }) 
}

getDescriptionAndLocation(`https://www.metmuseum.org/art/collection/search/436524`);
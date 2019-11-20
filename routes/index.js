const express = require('express');
const getSampleObjects = require('../evalPreferences/evalPreferences');

const router = express.Router();

/*--------------- FOR TESTING ---------------*/
let testArray = [
  {
      "objectID": 544502,
      "isHighlight": true,
      "accessionNumber": "11.215.451",
      "isPublicDomain": true,
      "primaryImage": "https://images.metmuseum.org/CRDImages/eg/original/DT256117.jpg",
      "primaryImageSmall": "https://images.metmuseum.org/CRDImages/eg/web-large/DT256117.jpg",
      "additionalImages": [ ],
      "constituents": null,
      "department": "Egyptian Art",
      "objectName": "Ceiling painting, palace of Amenhotep III",
      "title": "Ceiling painting from the palace of Amenhotep III",
      "culture": "",
      "period": "New Kingdom",
      "dynasty": "Dynasty 18",
      "reign": "reign of Amenhotep III",
      "portfolio": "",
      "artistRole": "",
      "artistPrefix": "",
      "artistDisplayName": "",
      "artistDisplayBio": "",
      "artistSuffix": "",
      "artistAlphaSort": "",
      "artistNationality": "",
      "artistBeginDate": "",
      "artistEndDate": "",
      "objectDate": "ca. 1390–1353 B.C.",
      "objectBeginDate": -1390,
      "objectEndDate": -1390,
      "medium": "Dried Mud, mud plaster, paint\r\nGesso",
      "dimensions": "h. 140 cm (55 1/8 in); w. 140 cm (55 1/8 in)",
      "creditLine": "Rogers Fund, 1911",
      "geographyType": "From",
      "city": "",
      "state": "",
      "county": "",
      "country": "Egypt",
      "region": "Upper Egypt, Thebes",
      "subregion": "Malqata",
      "locale": "Palace of Amenhotep III",
      "locus": "Antechamber to King's bedroom",
      "excavation": "MMA excavations, 1910–11",
      "river": "",
      "classification": "",
      "rightsAndReproduction": "",
      "linkResource": "",
      "metadataDate": "2019-02-01T10:50:49.477Z",
      "repository": "Metropolitan Museum of Art, New York, NY",
      "objectURL": "https://www.metmuseum.org/art/collection/search/544502",
      "tags": [
          "Ox"
      ]
  },
  {
      "objectID": 247017,
      "isHighlight": true,
      "accessionNumber": "03.14.13a–g",
      "isPublicDomain": true,
      "primaryImage": "https://images.metmuseum.org/CRDImages/gr/original/DP143704.jpg",
      "primaryImageSmall": "https://images.metmuseum.org/CRDImages/gr/web-large/DP143704.jpg",
      "additionalImages": [
          "https://images.metmuseum.org/CRDImages/gr/original/DP144402.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP144405.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP146000.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170940.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170943.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170950.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170941.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170952.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170956.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170958.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170959.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP363579.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170960.jpg",
          "https://images.metmuseum.org/CRDImages/gr/original/DP170961.jpg"
      ],
      "constituents": null,
      "department": "Greek and Roman Art",
      "objectName": "Cubiculum (bedroom) from the Villa of P. Fannius Synistor",
      "title": "Cubiculum (bedroom) from the Villa of P. Fannius Synistor at Boscoreale",
      "culture": "Roman",
      "period": "Late Republic",
      "dynasty": "",
      "reign": "",
      "portfolio": "",
      "artistRole": "",
      "artistPrefix": "",
      "artistDisplayName": "",
      "artistDisplayBio": "",
      "artistSuffix": "",
      "artistAlphaSort": "",
      "artistNationality": "",
      "artistBeginDate": "",
      "artistEndDate": "",
      "objectDate": "ca. 50–40 B.C.",
      "objectBeginDate": -50,
      "objectEndDate": -40,
      "medium": "Fresco",
      "dimensions": "8 ft. 8 1/2 in. × 10 ft. 11 1/2 in. × 19 ft. 1 7/8 in. (265.4 × 334 × 583.9 cm)",
      "creditLine": "Rogers Fund, 1903",
      "geographyType": "",
      "city": "",
      "state": "",
      "county": "",
      "country": "",
      "region": "",
      "subregion": "",
      "locale": "",
      "locus": "",
      "excavation": "",
      "river": "",
      "classification": "Miscellaneous-Paintings",
      "rightsAndReproduction": "",
      "linkResource": "",
      "metadataDate": "2019-10-08T04:44:02.32Z",
      "repository": "Metropolitan Museum of Art, New York, NY",
      "objectURL": "https://www.metmuseum.org/art/collection/search/247017",
      "tags": [
          "Architecture",
          "Bedrooms"
      ]
  }
];

/*--------------------*/

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/assess', (req, res, next) => {
  res.render('assess', {testArray});
  console.log(testArray);
});

router.get('/details', (req, res, next) => {
  res.render('details');
});

router.get('/test', (req, res, next) => {
  Promise.all(getSampleObjects('Paintings'))
    .then(objects => {
      res.send(objects);
    })
    .catch(err => console.log(err));
});

router.get('/assess/:medium', (req, res, next) => {
  const media = {
    painting: 'Paintings',
    sculpture: 'Sculpture',
    furniture: 'Furniture',
    music: 'Musical+instruments',
  };

  const selectedMedia = media[req.params.medium];
  Promise.all(getSampleObjects(selectedMedia))
    .then(objects => {
      res.render('assess', { objects });
    })
    .catch(err => console.log(err));
});

router.post('/assess', (req, res, next) => {
  console.log("route entered!");
  console.log(JSON.parse(JSON.stringify(req.body)));
});

module.exports = router;

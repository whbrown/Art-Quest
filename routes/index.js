const express = require('express');
const getSampleObjects = require('../evalPreferences/evalPreferences');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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

  if (!Object.keys(media).includes(req.params.medium)) {
    return res.redirect('/');
  }

  const selectedMedium = media[req.params.medium];
  console.log(selectedMedium);
  Promise.all(getSampleObjects(selectedMedium))
    .then(objects => {
      res.render('assess', { objects, selectedMedium });
    })
    .catch(err => console.log(err));
});

router.post('/assess', (req, res, next) => {
  console.log('route entered!');
  console.log(JSON.parse(JSON.stringify(req.body)));
});

module.exports = router;

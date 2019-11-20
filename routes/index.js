const express = require('express');
const getSampleObjects = require('../evalPreferences/evalPreferences');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/assess', (req, res, next) => {
  res.render('assess');
});

router.get('/details', (req, res, next) => {
  res.render('details');

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
      res.render('assessment', { objects });
    })
    .catch(err => console.log(err));
});

router.post('/assess', (req, res, next) => {
  req.body;
});

module.exports = router;

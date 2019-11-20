const express = require('express');
const getSampleObjects = require('../evalPreferences/evalPreferences');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
router.get('/assessment', (req, res, next) => {
  res.render('assessment');
=======
router.get('/assess', (req, res, next) => {
  res.render('assess');
>>>>>>> c15bb97835b91daec21c322ec15f7f31e6b7bddf
});

router.get('/details', (req, res, next) => {
  res.render('details');
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
      res.render('assessment', { objects });
    })
    .catch(err => console.log(err));
});

router.post('/assess', (req, res, next) => {
  req.body;
<<<<<<< HEAD
  // receive array of approved paintings from page 2
  //
  // render page 3 with
=======
>>>>>>> c15bb97835b91daec21c322ec15f7f31e6b7bddf
});

module.exports = router;

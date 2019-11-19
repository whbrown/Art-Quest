const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/assessment', (req, res, next) => {
  res.render('assessment');
});

router.get('/details', (req, res, next) => {
  res.render('details');
});

module.exports = router;

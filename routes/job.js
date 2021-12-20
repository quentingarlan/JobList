const express = require('express');
const router = express.Router();
const poleEmploi = require('../poleEmploi/poleEmploiCalls');
const mongoClient = require('../db/mongoClient');
const report = require('../report/report');

/* Insert job infos in db (this should be a post but then you would have to use postman to test, keep like this for now) */
router.get('/insert', function (req, res) {
  const page = req.query.page;
  poleEmploi.getPoleEmploiOffers(page, function (offers) {
  
  });
});


module.exports = router;
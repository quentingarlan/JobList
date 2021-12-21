const express = require('express');
const router = express.Router();
const poleEmploi = require('../poleEmploi/poleEmploiCalls');
const mongoClient = require('../db/mongoClient');
const report = require('../report/report');

/* Insert job infos in db (this should be a post but then you would have to use postman to test, keep like this for now) */
router.get('/insert', function (req, res) {
  const page = req.query.page;
  poleEmploi.getPoleEmploiOffers(page, function (offers) {
    if (offers.resultats) {
      console.log('pole emploi new offers count: ', offers.resultats.length);
      // Add or update offers from pole emploi in jobList database
      mongoClient.AddOffers(offers.resultats);
      res.send('offers inserted!');
    } else{
      res.send('no offers found');
    }
  });
});

router.get('/report', function (req, res) {
  mongoClient.GetOffers(function (offers) {
    report.logReport(offers);

    res.redirect('/folder/report.txt');
  });
});
module.exports = router;
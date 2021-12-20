const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res)  {
  res.send('jobList Home (nothing to see here, try /job page)');
});

module.exports = router;

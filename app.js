var express = require('express');
var app = express();

const homeFolderPath = process.env.HOME;

app.listen(3000, function () {
    console.log('jobList on localhost:3000!');
});

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var jobRouter = require('./routes/job');
app.use('/job', jobRouter);
app.use('/folder', express.static(homeFolderPath));
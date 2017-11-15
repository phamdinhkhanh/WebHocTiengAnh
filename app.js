const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const questionRouter = require('./routers/questionRouter');

let app = express();

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(express.static(__dirname + "/public"));

app.use('/api/question', questionRouter);

mongoose.connect("mongodb://localhost/hoctienganh", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
});

app.listen(1000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});

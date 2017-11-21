const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const questionRouter = require('./routers/questionRouter');
const questionViewRouter = require('./routers/questionViewRouter');
const userRouter = require('./routers/userRouter');
let app = express();

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );

app.use(express.static(__dirname + "/publics"));

app.use('/api/question', questionRouter);
app.use('/api/user',userRouter);
app.use('/question', questionViewRouter);

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

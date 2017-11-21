const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const questionRouter = require('./routers/questionRouter');
const userRouter = require('./routers/userRouter');
const config = require('./config.json');
let app = express();

let connectionString = process.env.PORT ?
config.production.connectionString:
config.development.connectionString;


let port = process.env.PORT ? process.env.PORT:
config.development.port;

app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(express.static(__dirname + "/public"));


app.use('/api/question', questionRouter);
app.use('/api/user',userRouter);
console.log("connection string", connectionString);
mongoose.connect(connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});

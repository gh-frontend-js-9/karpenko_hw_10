const express = require('express');
const app = express();
const router = require('./routes');
const gulp = require('./gulp');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
gulp.default();
app.use('/', router);

app.listen(3000);
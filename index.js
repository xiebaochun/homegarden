var path = require('path');
//var request = require('request');
var express = require('express');
var Loader = require('loader');
var _ = require('lodash');
var app = express();

var bodyParser = require('body-parser');
var webRouter = require('./web_router');
app.use('/public',express.static(path.resolve(__dirname ,'public')));

console.log(path.resolve(__dirname ,'public'));
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3000;

var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('ejs-mate'));
app.locals._layoutFile = 'layout/layout.html';

_.extend(app.locals, {
	Loader:Loader
});

app.use('/',webRouter);


app.listen(port);

console.log("app is running on " + port);
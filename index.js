var path = require('path');
var config = require('./config');
//var request = require('request');
var express = require('express');
var session = require('express-session');
var Loader = require('loader');
var apiRouter = require('./api_router');
var cors = require('cors');
var _ = require('lodash');
var app = express();

var bodyParser = require('body-parser');
var webRouter = require('./web_router');
app.use('/public',express.static(path.resolve(__dirname ,'public')));


console.log(path.resolve(__dirname ,'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')(config.session_secret));
var RedisStore = require('connect-redis')(session);

app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    pass: config.redis_password,
  }),
  resave: false,
  saveUninitialized: false,
}));

var port = process.env.PORT || 3000;

var router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('ejs-mate'));
app.locals._layoutFile = 'layout/layout.html';

_.extend(app.locals, {
	Loader:Loader,
  current_nav:0
});

app.use('/api', cors(), apiRouter);
app.use('/',webRouter);

app.listen(port);

console.log("app is running on " + port);
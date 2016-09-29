var express = require('express');
var game = require('./api/game');

var router = express.Router();

// home page
router.post('/guess', game.guess);

module.exports = router;
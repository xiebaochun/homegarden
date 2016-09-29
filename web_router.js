/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var express = require('express');
var site = require('./controllers/site');
var sign = require('./controllers/sign');
var user = require('./controllers/user');
var setting = require('./controllers/setting');
var game = require('./controllers/game');
var group = require('./controllers/group');

var router = express.Router();

// home page
router.get('/', site.index);
router.get('/register', site.register);
router.post('/register', site.doRegister);
router.get('/saveUser/:name', site.newAndSave);

router.get('/signin', sign.showLogin);
router.post('/signin', sign.login);
router.get('/signout', sign.signout);

// 个人中心
router.get('/user', user.user);

//设置
router.get('/setting', setting.index);

//游戏
router.get('/game', site.game);
router.get('/guessGame', game.guess);

//家族
router.get('/group', site.group);
router.get('/new_group', group.newGroup);

module.exports = router;
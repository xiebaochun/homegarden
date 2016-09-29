
var User         = require('../proxy').User;
// var Topic        = require('../proxy').Topic;
var _            = require('lodash');

exports.index = function (req, res, next) {
    console.log(req.session);
    var current_id = null;
    if(req.session.user){
        current_id = req.session.user.id;
    }else{
        return res.redirect('/signin');
    }
    User.getUserById( current_id,
        function(err,data){
            console.log('首页数据');
            if(err){
                res.render('404',{});
            }
            console.log(data);
            if(data){
                res.render('index', {
                    id: data.id || 00000,
                    name: data.name || 'default_name',
                    level: data.level || 0,
                    money_count: data.money|| 0,
                    rank: data.rank || 1,
                    experience: data.experience || 0,
                    current_nav: 1,
                });
            }else{
                res.redirect('/sigin');
            }
        }
    );
};
//游戏
exports.game = function(req, res) {
    res.render('game',{current_nav: 3});
}

//家族
exports.group = function(req, res) {
    res.render('group', {current_nav: 2});
}

//注册路由
exports.register = function(req, res, next){
    res.render('register/register',{});
}
//执行注册
exports.doRegister = function(req, res){
    var username = req.body.username;
    var password = req.body.pwd;
    console.log(req.body);
    if(!username || !password){
        res.render('register/failed',{});
    }else{
        var userData = {
            username: username,
            password: password
        }
        User.newAndSave( userData,
            function(err,data){
                if(err){
                    console.log(err);
                }
                console.log(data);
                res.render('register/register_success',{name:data.name});
            }
        );
    }
}

//增加新用户
exports.addNewUser = function(username, password){
    User.newAndSave( req.params.name,
        function(err,data){
          if(err){
            console.log(err);
          }
          console.log(data);
          res.render('index', {
              name:data.name
          });
        }
    );
}

exports.newAndSave = function (req, res, next) {
    console.log(req.params.name);
    var userData = {
        username:req.params.name,
        password:''
    }
    User.newAndSave( userData,
        function(err,data){
          if(err){
            console.log(err);
          }
          console.log(data);
          res.render('index', {
              name:data.name
          });
        }
    );
    
};

var User         = require('../proxy').User;
// var Topic        = require('../proxy').Topic;
var _            = require('lodash');

exports.index = function (req, res, next) {
    User.getUserById( 10000,
        function(err,data){
          console.log(data);
          res.render('index', {
            id: data.id || 00000,
            name: data.name || 'default_name',
            level: data.level || 0,
            money_count: data.money_count || 1000,
            rank: data.rank || 1
          });
        }
    );
};

exports.newAndSave = function (req, res, next) {
  console.log(req.params.name);
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
    
};
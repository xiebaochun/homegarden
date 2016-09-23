var models  = require('../models');
var User    = models.User;

exports.getUserById = function (id, callback) {
  if (!id) {
    return callback();
  }
  User.findOne({id: id}, callback);
};

exports.newAndSave = function (name, callback) {
	User.count({},function(err, count){

	  var user         = new User();
	  user.id = 10000 + parseInt(count);
	  user.name        = name;
	  user.save(callback);
	});
};


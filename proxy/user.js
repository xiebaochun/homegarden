var models  = require('../models');
var User    = models.User;

exports.getUserById = function (id, callback) {
  if (!id) {
    return callback();
  }
  User.findOne({id: id}, callback);
};

exports.newAndSave = function (Data, callback) {
	User.count({},function(err, count){
		var user         = new User();
		user.id 		 = 10000 + parseInt(count);
		user.name        = Data.username;
		user.password    = Data.password;
		user.level       = 0;
		user.money       = 0;
		user.experience  = 0;
		user.save(callback);
	});
};

exports.getUserByName = function(name, callback){
	/*if(!name){
		return callback(1, null);
	}*/
	User.findOne({'name':name}, callback);
}
//增加财富
exports.addMoney = function( id, count , callback) {
	User.findOne({id:id},function(err, data){
		if(err){
			callback(0, {});
		}
		if(data){
			var currentMoney  = parseInt(data.money) + parseInt(count);
			User.update({id:id},{money:currentMoney}, function(err, data){
				if(data){
					User.findOne({id:id},callback);
				}
			});
		}else{
			callback(0, {});
		}

	});
}
//减少财富
exports.reduceMoney = function( id, count , callback) {
	User.findOne({id:id},function(err, data){
		if(err){
			callback(0, {});
		}
		if(data){
			var currentMoney  = data.money - count;
			User.update({id:id},{money:currentMoney}, callback);
		}else{
			callback(0, {});
		}

	});
}


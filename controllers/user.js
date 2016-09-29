var User         = require('../proxy').User;

exports.user = function(req, res, next) {
	console.log(req.session);
	var current_id = null;
	if(req.session.user){
	    current_id = req.session.user.id;
	}else{
	    return res.redirect('/signin');
	}
	User.getUserById( current_id,
	    function(err,data){
	        console.log('用户数据');
	        if(err){
	            res.render('404',{});
	        }
	        console.log(data);
	        if(data){
	            res.render('user/user', {
	                id: data.id || 00000,
	                name: data.name || 'default_name',
	                level: data.level || 0,
	                money_count: data.money|| 0,
	                rank: data.rank || 1,
	                experience: data.experience || 0,
	                current_nav:4
	            });
	        }else{
	            res.render('register/register',{});
	        }
	    }
	);
}
exports.setting = function(req, res, next) {
	res.render('setting', {});
}
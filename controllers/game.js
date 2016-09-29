var User = require('../proxy/user');

exports.guess = function(req, res) {
	var id = req.session.user.id;
	User.getUserById(id, function(err, data){
		res.render('games/guessGame', {user:data});
	});
}
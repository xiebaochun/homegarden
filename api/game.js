var User = require('../proxy/user');

exports.guess = function(req, res) {
	var action = req.body.action;
	var money = req.body.money;
	var isGuess = null;
	game_result = null;
	var random = parseInt( Math.random() * 100 + 1 );
	if( random > 50 ) {
		game_result = 1;
	}else{
		game_result = 2;
	}
	var addMoney = null;
	//中奖
	if(action == game_result){
		addMoney = money;
		isGuess = 1;
	}
	//未中奖
	else{
		addMoney = -money;
		isGuess = 0;
	}
	User.addMoney( req.session.user.id, addMoney, function(err, data){
		if(err){

		}
		var result = {
			status: 1,
			data: {
				isGuess: isGuess,
				from:{
					action: action,
					money: money,
				},
				result:{
					getMoney: addMoney,
					user: data
				}
			}
		};
		res.send(result);
	});
	
	
}
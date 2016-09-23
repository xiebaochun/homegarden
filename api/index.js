var path = require('path');
var request = require('request');
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use('/',express.static(path.resolve(__dirname ,'../dist/')));

console.log(path.resolve(__dirname ,'../dist/'));
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/',function(req, res){
	// res.json([
	//   {"id": "1", "author": "Pete Hunt", "text": "This is one comment"},
	//   {"id": "2", "author": "Jordan Walke", "text": "This is *another* comment"}
	// ]);
	request('http://xiaoshushidai.com/wap/index.php?post_type=json',function(error,response,body){

		res.end(body);
	});

});
router.get('/deals/:page',function(req, res){
	// res.json([
	//   {"id": "1", "author": "Pete Hunt", "text": "This is one comment"},
	//   {"id": "2", "author": "Jordan Walke", "text": "This is *another* comment"}
	// ]);
	request('http://xiaoshushidai.com/wap/index.php?ctl=deals&page='+req.params.page+'&post_type=json',function(error,response,body){

		res.end(body);
	});

});
router.get('/deal/:id',function(req, res){
	// res.json([
	//   {"id": "1", "author": "Pete Hunt", "text": "This is one comment"},
	//   {"id": "2", "author": "Jordan Walke", "text": "This is *another* comment"}
	// ]);
	request('http://xiaoshushidai.com/wap/index.php?ctl=deal&id='+req.params.id+'&post_type=json',function(error,response,body){

		res.end(body);
	});

});
router.get('/:ctl',function(req, res){

	request('http://xiaoshushidai.com/wap/index.php?ctl='+req.params.ctl+'&post_type=json',function(error,response,body){
		res.end(body);
	});

});

app.use('/api',router);

app.listen(port);

console.log("app is running on " + port);
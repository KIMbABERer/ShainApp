var express = require('express');
var multer = require('multer');
var models 	= require('./../models');
var app = express();
var router 	= require('express').Router();

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './app/vendor/img');
	},
	filename: function(req, file, callback) {
		var originalName = file.originalname;
		var fileExtension = originalName.split('.').slice(-1);
		originalName = originalName.split('.').slice(0,-1).join('.');

		callback(null, originalName + '-' + Date.now() + '.' + fileExtension);
	}
})

var upload = multer({storage: storage}).any();

// set up API endpoint
router.post('/', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			res.send(err);
			console.log(err);
		}
		console.log(29);
		console.log(res);
		console.log(31);
		console.log(req.files[0].path);
		res.send(req.files[0].path);
	});
});

router.post('/pic',function(req,res){
	console.log("35");
	console.log(req.body);
	console.log("37");
	var __pic = req.body;
	models.userspic.create(__pic).then(function(user){
		res.send(user);
	})
});

router.get('/picture',function(req,res){
	models.userspic.findAll().then(function(users){
		//findall returns an array of objects
		res.json(users);
	})
})

router.get('/pic/:userId',function(req,res){
	console.log("52");
	console.log(req);
	console.log("54");
	var where = {where:{id:req.params.userId}}
	models.userspic.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});



module.exports = router;
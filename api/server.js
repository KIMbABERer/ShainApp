var express 	= require('express');
var multer      = require('multer');
var models	 	= require('./models');
var bodyParser  = require('body-parser');

var app 		= express();
var port 		= 80;

//app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

//middleware
var authentication = require("./middleware/auth");

//route configuration
var register = require('./routes/register');
var admin    = require('./routes/admin');
var upload   = require('./routes/upload');
var comment  = require('./routes/comment');
// var naming   = require('./routes/naming');

//set Routes
app.use('/api/register',register);
// app.use('/api/admin',authentication,admin);
app.use('/api/admin',admin);
app.use('/api/upload',upload);
app.use('/api/comment',comment);
// app.use('/api/naming',naming);

models.sequelize.sync().then(function(){
	app.listen(port,function(){
		console.log('Listening on http://localhost:%s',port);
		console.log('Stop Server With CTRL + C');
	});
});
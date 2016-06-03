var models 	= require('./../models');
var router 	= require('express').Router();

//get all users
router.get('/',function(req,res){
	models.users.findAll()
	.then(function(users){
		console.log(users);
		res.json({users:users});
	})
})

router.get('/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.users.find(where).then(function(user){
		console.log("16");
		console.log(user.data);
		res.json({user:user});
	})
})

//delete test accounts via url bar
router.get('/remove/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});

// router.post('/login', function(req, res) {
// 	req.body // should contain user email
// 	models.users.find // find user with user email from req.body
// 	// after finding user,
// 	res.json() // send user information back
// })

module.exports = router;


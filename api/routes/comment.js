var models 	= require('./../models');
var router 	= require('express').Router();

router.post('/',function(req,res){
    console.log(req.body);
	var user = req.body;
	models.post_pics.create(user).then(function(user){
		console.log(user);
		res.json(user);
    })
})

// router.put('/',function(req,res){
//     var where = {where:{id:req.params.userId}};
//     models.post_pics.find(where).then(function(user){
		
// 	})
// })

router.get('/',function(req,res){
	models.post_pics.findAll().then(function(comments){
		//findall returns an array of objects
		res.json({comment:comments});
	})
})


router.get('/remove/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.post_pics.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});

router.get('/removeall',function(req,res){
	models.post_pics.findAll().then(function(user){
		for (var i = 0; i < user.length; i++) {
			user[i].destroy();
		}
		res.json({
			deleted:true
		});	
	});
});


module.exports = router;





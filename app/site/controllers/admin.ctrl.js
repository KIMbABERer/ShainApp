(function(){
	'use strict';

	angular
		.module('shainApp')
		.controller('adminCtrl',adminCtrl);

	adminCtrl.$inject = ['$http','$state'];

	function adminCtrl($http,$state) {
		var adminVm = this;
		
		getUsers();
		adminVm.delAccount = delAccount;
		adminVm.getUsers = getUsers;

		function getUsers(){
			$http.get('/api/admin')
			.then(function(res){
				console.log("get is fine");
				console.log(res.data.users);
				adminVm.users = res.data.users;
			})
		}

		function delAccount(id){
			$http.get('/api/admin/remove/' + id)
			.then(function(res){
				console.log("DEL COMPLETED");
				getUsers();
			})
		}

	};
	
})();

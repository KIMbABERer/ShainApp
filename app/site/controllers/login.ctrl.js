(function(){
	'use strict';

	angular
		.module('shainApp')
		.controller('loginCtrl',loginCtrl);

	loginCtrl.$inject = ['$http','$location','profileSrv','$scope']; // inject a service

	function loginCtrl($http,$location,profileSrv,$scope) {
		var authVm = this;

		authVm.users = "";
		authVm.count = 0;
		authVm.user = profileSrv.profile;
		authVm.id = "";
		authVm.name = "";
		authVm.log_In_Name = localStorage.name;
		authVm.warning = false;
		authVm.createAccountWarning = false;

		//buttons
		authVm.auth_btn = "LOG IN";
		authVm.register_btn = 'Create an account';
		authVm.searchBtn = "Search Friends"

		//Functions
		authVm.register = register;
		authVm.authenticate = authenticate;
        authVm.logout = logout;
        authVm.goToPage = goToPage;
        authVm.searchUsers = searchUsers;
   //      authVm.likeBtn = likeBtn;

   //      function likeBtn(id){
   //          var user = {
			// 	received_comment_name:authVm.firstName
			// }
			
   //      }


        function searchUsers(id) {
        	$http.get('/api/admin')
        	.then(function(res){
                console.log(res.data.users);
                for (var i = 0; i < res.data.users.length; i++) {
                	if (id == res.data.users[i].first_name) {
                		$location.path('/visitor/' + res.data.users[i].id);
                		localStorage.visitorId = res.data.users[i].id; 
                		profileSrv.input = res.data.users[i].id;
                	} else {
                		authVm.searchBtn = "NO Result for you , Just try again";
                	}
                }
        	})     
        }
     
        function goToPage(id) {
        	$location.path('/visitor/' + id);
        }

        if (typeof localStorage !== 'undefined') {
      
	        getInfo();
	        authVm.getInfo = getInfo;
	        function getInfo(){
	        	$http.get('/api/admin/' + localStorage.id)
		        	.then(function(res){
		        		console.log(res.data);
		        		authVm.user = res.data;
		        		console.log(authVm.user.user.email);
		        		console.log(authVm.user.user.id);
		        	})
	        }
	    }

		function logout(){
			console.log("logout");
	        // localStorage.removeItem('authToken');
	        localStorage.removeItem('email');
	        localStorage.removeItem('id');
	        localStorage.removeItem('visitorId');
	        console.log(localStorage);
	        $location.path('/');
	        // remove userid from localstorage
		}

		function register(){	
			var user = {
				first_name:authVm.firstName,
				last_name:authVm.lastName,
				email:authVm.email,
				password:authVm.password,
				interests:authVm.interest
			}

			$http.get('/api/admin')
				.then(function(res){
					authVm.users = res.data.users;

					for (var i = 0 ; i < authVm.users.length ; i++) {
						if (authVm.users[i].email == user.email ) {	
							authVm.createAccountWarning = true;
	                        return authVm.register_btn = 'Account already existed';
						} else {
							authVm.count += 1;
						}
	                } 

	                if (authVm.count == authVm.users.length) {
					user = JSON.stringify(user);
					$http.post('/api/register',user)
						.then(function(res){
							console.log(res);
							authVm.createAccountWarning = true;
							authVm.register_btn = res.data.msg;
						})
				    }
				})	

		}

		authVm.toPersonal = toPersonal;
		function toPersonal(id) {

			$location.path('/personal/' + id);
		}

		function authenticate(){
			var user = {
				email:authVm.emailLog,
				password:authVm.passwordLog
			}

			user = JSON.stringify(user);
			$http.post('/api/register/authenticate',user)
			.then(function(res,err){
				if (err) {
					console.log("ERROR");
					console.log(err);
					authVm.auth_btn = 'Fail To Login';
					authVm.warning = true;
				} else {
					console.log("NOT ERROR");
					console.log(res);
					// localStorage.email = res.data.user.email;
					// localStorage.id = res.data.user.id;
					// localStorage.visitorId = res.data.user.id;
					// localStorage.name = res.data.user.first_name;
					// profileSrv.backToPersonalPage = res.data.user.id;
					// authVm.id = res.data.user.id; 
					// authVm.auth_btn = res.data.msg;

					// id = res.data.user.id;
					if (res.data.msg == 'Login Success') {
						// authVm.auth_btn = 'Login Success';
						// authVm.warning = true;
						profileSrv.profile = res.data.user;
						toPersonal(res.data.user.id);

						localStorage.email = res.data.user.email;
						localStorage.id = res.data.user.id;
						localStorage.visitorId = res.data.user.id;
						localStorage.name = res.data.user.first_name;
						profileSrv.backToPersonalPage = res.data.user.id;
						authVm.id = res.data.user.id; 
						// authVm.auth_btn = res.data.msg;

						// localStorage.setItem('id', JSON.stringify(res.data.user.id));
						// authVm.id = localStorage.id;
						// instead, send res.data.user to service
						// then move user to personal.html
					} else {
						authVm.auth_btn = res.data.msg;
						authVm.warning = true;
					}
				}

				/* 
				save to localstorage some information about the user (e.g., userid)
				*/
			})
		}

		$scope.$watch(function(){
	        return profileSrv.profile;
	    },true);

		// $scope.$watch for change in service
		// when service gets updated with res.data.user,
		// save that data back to authVm.user
		
		//for a choose file button things
		;( function ( document, window, index )
		{
			var inputs = document.querySelectorAll( '.inputfile' );
			Array.prototype.forEach.call( inputs, function( input )
			{
				var label	 = input.nextElementSibling,
					labelVal = label.innerHTML;

				input.addEventListener( 'change', function( e )
				{
					var fileName = '';
					if( this.files && this.files.length > 1 )
						fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
					else
						fileName = e.target.value.split( '\\' ).pop();

					if( fileName )
						label.querySelector( 'span' ).innerHTML = fileName;
					else
						label.innerHTML = labelVal;
				});

				// Firefox bug fix
				input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
				input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
			});
		}( document, window, 0 ));
	}

})();
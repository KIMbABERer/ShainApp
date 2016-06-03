(function(){
	'use strict';

	angular
		.module('shainApp',['ui.router','ui.bootstrap','ngMessages','angular-jwt']);

	angular
		.module('shainApp')
		.config(configBlock);

	configBlock.$inject = ['$stateProvider', '$urlRouterProvider','$httpProvider'];

		function configBlock($stateProvider, $urlRouterProvider, $httpProvider){

			$urlRouterProvider.otherwise('/');

			$stateProvider
			// new state('search', {})
			.state('login',{
				url:'/',
				templateUrl:'site/partials/login.html',
				controller:'loginCtrl as ctrl'
			})

			.state('personal',{
				url:'/personal/:userId',
				templateUrl:'site/partials/personal.html',
				controller:'loginCtrl as ctrl'
			})

			.state('visitor',{
				url:'/visitor/:userId',
				templateUrl:'site/partials/visitor.html',
				controller:'visitorCtrl as ctrl'
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'adminCtrl as ctrl',
				resolve:{
					user:function($state){
						if(localStorage.authToken == '' || localStorage.authToken == undefined){
							$state('login');
						}
					}
				}
			});

			$httpProvider.interceptors.push(function(jwtHelper){
				return {
					request:function(config){
						console.log('Requests');
						console.log(config);

						if(localStorage.authToken != undefined){
							console.log("authtoken saved");
							console.log(localStorage.authToken);
							
							config.headers.authentication = localStorage.authToken;
						}
						return config;
					},
					response:function(response){
						console.log('Response');

						var auth_token = response.headers('authentication');
						console.log(auth_token);

						if(auth_token){
							var decrypt_token = jwtHelper.decodeToken(auth_token);
							console.log(decrypt_token);
							if(decrypt_token.email){
								localStorage.authToken = auth_token;
							}
							
						}
						return response;
					}
				}
			})
		}

})();
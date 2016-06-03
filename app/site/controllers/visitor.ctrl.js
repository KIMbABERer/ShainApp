(function(){
	'use strict';

	angular
		.module('shainApp')
		.controller('visitorCtrl',visitorCtrl);

	visitorCtrl.$inject = ['$http','$location','profileSrv','$scope']; // inject a service

	function visitorCtrl($http,$location,profileSrv,$scope) {
		var visitorVm = this;
		visitorVm.images = [];
		visitorVm.userProfile = profileSrv.input;

        visitorVm.user = localStorage.id;
        visitorVm.comments = {};

        //comment area
        visitorVm.commentResult = "";

        getAllComment();
        visitorVm.getAllComment = getAllComment;
        function getAllComment() {
            $http.get('/api/comment/')
            .then(function(res,err){
                if (res) {
                    visitorVm.comments = {};
                    console.log(res.data.comment);
                    var comments = res.data.comment;

                    for (var i = 0; i < comments.length; i++) {
                        if (!visitorVm.comments[comments[i].pic_id]) {
                            visitorVm.comments[comments[i].pic_id] = [];   
                        }      
                        visitorVm.comments[comments[i].pic_id].push(comments[i].post_comment_name + " :  " + comments[i].comment);
                    }
                }
            })
        }

        visitorVm.postComment = postComment;
        function postComment(comment,id) {
            visitorVm.commentResult = "";
            var commentInfo = {
                pic_id: id,
                post_comment: localStorage.id,
                post_comment_name: localStorage.name,
                received_comment: localStorage.visitorId,
                comment: comment
            }

            visitorVm.comments[commentInfo.pic_id].push(commentInfo.post_comment_name + " : " + commentInfo.comment);

            console.log(visitorVm.comments);
            commentInfo = JSON.stringify(commentInfo);
            $http.post('/api/comment/',commentInfo)
            .then(function(res,err){
                if (res) {
                    console.log("post finished");
                    getAllComment();
                    updateScroll(id);
                } else {
                    console.log(err);
                }
            })
        } 

        visitorVm.updateScroll = updateScroll;
        function updateScroll(index){
            console.log(index)
            var element = document.getElementById("textBox" + index);
            element.scrollTop = element.scrollHeight ;
        }

		visitorVm.goBack = goBack;
		function goBack() {
			// $location.path('/personal/' + visitorVm.userProfile);
            $location.path('/personal/' + localStorage.id);
            localStorage.visitorId = localStorage.id;
            
		}

		getInfo();
        visitorVm.getInfo = getInfo;
        function getInfo(){
        	$http.get('/api/admin/' + localStorage.visitorId)
	        	.then(function(res){
                    console.log(res);
	        		visitorVm.user = res.data.user;
                    getAllimages();
	        	})
        }


        getAllimages();
        visitorVm.getAllimages = getAllimages;
        function getAllimages() {
            $http.get('/api/upload/picture/')
            .then(function(res,err){
                if (res) {
                    visitorVm.images = [];
                    console.log(res.data.length);
                    for (var i = 0; i < res.data.length; i++) {
                        if (localStorage.visitorId == res.data[i].friend_1) {
                            visitorVm.images.push({pic:res.data[i].pic_link,id:res.data[i].id});
                        } else {
                            console.log("Can't find an images");
                        }
                    }
                } else {
                    console.log("not working now");
                }
            })
        }
   
	}

})();
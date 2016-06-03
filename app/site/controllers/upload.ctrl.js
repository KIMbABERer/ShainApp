(function(){
    
    angular
        .module('shainApp')
        .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    angular
        .module('shainApp')
        .controller('upCtrl',upCtrl)

        upCtrl.$inject = ['$http','profileSrv'];

        function upCtrl($http,profileSrv) {
            var ctrl = this;
            ctrl.images = [];
            ctrl.user = localStorage.id;
            ctrl.comments = {};
            ctrl.postingUserName = "";
            ctrl.checkFirstComment = 0;

            // ctrl.comments = {
            //     '72': ['actual comments', 'comment 2'],
            //     '69': ['love','hum']
            // }
            
            //comment area
            ctrl.commentResult = "";

            getAllComment();
            ctrl.getAllComment = getAllComment;
            function getAllComment() {
                $http.get('/api/comment/')
                .then(function(res,err){
                    if (res) {
                        ctrl.comments = {};
                        ctrl.comments_length = {};
                        console.log(res.data.comment);
                        var comments = res.data.comment;

                        for (var i = 0; i < comments.length; i++) {
                            if (!ctrl.comments[comments[i].pic_id]) {
                                ctrl.comments[comments[i].pic_id] = [];   
                            }
                            ctrl.comments[comments[i].pic_id].push(comments[i].post_comment_name + " :  " + comments[i].comment);
                        }
                    }
                })
            }

            ctrl.postComment = postComment;
            function postComment(comment,id) {
                ctrl.commentResult = "";
                var commentInfo = {
                    pic_id: id,
                    post_comment: localStorage.id,
                    post_comment_name: localStorage.name,
                    received_comment: localStorage.visitorId,
                    comment: comment
                }

                ctrl.comments[commentInfo.pic_id].push(commentInfo.post_comment_name + " : " + commentInfo.comment);
                console.log(ctrl.comments);
                      
                console.log(commentInfo);
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

            ctrl.updateScroll = updateScroll;
            function updateScroll(index){
                console.log(index)
                var element = document.getElementById("textBox" + index);
                element.scrollTop = element.scrollHeight ;
            }
                
            getAllimages();
            ctrl.getAllimages = getAllimages;
            function getAllimages() {
                $http.get('/api/upload/picture/')
                .then(function(res,err){
                    if (res) {
                        ctrl.images = [];
                        console.log(res.data.length);
                        for (var i = 0; i < res.data.length; i++) {
                            if (ctrl.user == res.data[i].friend_1) {
                                ctrl.images.push({pic:res.data[i].pic_link,id:res.data[i].id});
                            } else {
                                console.log("Can't find an images");
                            }
                        }
                    } else {
                        console.log("not working now");
                    }
                })
            }

            ctrl.erasePic = erasePic;
            function erasePic(id) {
                $http.get('/api/upload/pic/' + id)
                .then(function(res,err){
                    if (res) {
                        console.log("delete completed");
                        getAllimages();
                    } else {
                        console.log("not working now");
                    }
                })
            }

            ctrl.uploadedFile = uploadedFile;
            function uploadedFile(){ 
                
                console.log("HI KIM");
                var file = ctrl.file;
                var formData = new FormData();
                formData.append('file', file);

                $http.post('/api/upload',formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                    })
                    .then(function(res){
                        console.log(res);
                        console.log(ctrl.user);
                        var route = {
                            friend_1:ctrl.user,
                            pic_link:res.data.slice(4)
                        }
                        $http.post('/api/upload/pic',route)
                            .then(function(res,err){
                                if (res) {
                                    console.log(res.data.id);
                                    console.log(res.data.pic_link);
                                    ctrl.images.push({pic:res.data.pic_link,id:res.data.id});
                                    ctrl.comments[res.data.id] = [];
                                } else {
                                    console.log(err);
                                }
                        })
                      console.log('successfully uploaded file!');
                      // ctrl.images.push(res.data.slice(4));
                    })
                    .catch(function(err){
                      console.log(err);
                    });
            };
        }
})();
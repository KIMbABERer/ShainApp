(function(){

  angular
    .module('shainApp')
    .service('profileSrv',profileSrv);

    function profileSrv($state){
	    var self = this;
	    self.profile = ''; 
        self.input = '';
        self.backToPersonalPage = '';

    }
})();


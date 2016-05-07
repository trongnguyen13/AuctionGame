angular.module('auction').service('commonService', function($http, $q, $rootScope, $window) {
	this.executeRequest = function(apiUrl, method, params, data) {
		var request = {
			url: AuctionDefaultValues.host + '/' + apiUrl,
			method: method
		};
		
		if (params) {
			request.params = params;
		} 
		
		if (data) {
			request.data = data;
		} 
		
		var def = $q.defer();
		var that = this;
		$http(request)
		   .success(function(response) {
			   def.resolve(response);
		   })
		   .error(function(response) {
			   def.reject(response);
			   // handle error
			   blocking.unblockUI();
		   });
		
		return def.promise;
	};
});
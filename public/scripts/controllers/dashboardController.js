
angular.module('auction').controller('dashboard', function($scope, $rootScope, $routeParams, $location, $window, socket, auctionapi) {
	auctionapi.getUser($routeParams.user).then(function(result) {
		if (!!result) {
			// assign user to rootScope
			$rootScope.user = result;
			// broadcast join
			socket.emit('user:join', $rootScope.user.name);
		} else {
			$location.path('/');
		}
	});
	
	socket.on('user:kickoff', function() {
		$location.path('/');
	});
});
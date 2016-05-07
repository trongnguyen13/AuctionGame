angular.module('auction').controller('login', function($scope, $location, auctionapi) {
	$scope.username = undefined;
	$scope.onLogin = function() {
		auctionapi.login($scope.username).then(function(user) {
			// redirect to dashboard
			$location.path('/dashboard/' + $scope.username);
		});
	};
});
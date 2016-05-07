angular.module('auction').directive('currentAuction', function($window, $dialog, auctionapi, socket) {
	return {
		restrict: 'E',
        replace: true,
        templateUrl: 'scripts/directives/templates/currentAuction.html',
        scope: {
        	user: '=',
        	auction:'=auction'
        },
        controller: function ($scope, $element, $attrs) {
        	function showError(){
        		$dialog.errorDialog({
    				header: 'Error',
    				content: 'Please input a valid value.'
    			});
        	};
        	
        	$scope.amount = 0;
        	
        	auctionapi.getCurrentAuction().then(function(result) {
        		$scope.auction = result;
        	});

        	socket.on('auction:refresh', function(newAuction) {
        		$scope.auction = newAuction;
        		$scope.amount = 0;
        	});
        	
        	socket.on('auction:timeleft', function(timeelapsed) {
        		$scope.auction.timeleft = timeelapsed;
        		
        		if ($scope.auction.timeleft === 0) {
        			socket.emit('auction:completed', $scope.auction);
        		}
        	});
        	
        	$scope.onBid = function() {
        		if ($scope.auction.winningbid == 0 && $scope.amount < $scope.auction.minimum) {
        			showError();
        			return;
        		}
        		
        		if ($scope.amount < $scope.auction.winningbid) {
        			showError();
        			return;
        		}
        		
        		if ($scope.amount > $scope.user.coin) {
        			showError();
        			return;
        		}
        		
        		auctionapi.bidAuction($scope.auction, $scope.user.name, $scope.amount).then(function(result) {
            		$scope.auction = result;
        			socket.emit('auction:refresh', result);
            	});
        	};
        }
	}
});
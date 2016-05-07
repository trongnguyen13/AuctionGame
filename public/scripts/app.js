var AuctionDefaultValues = {
	locale: window.navigator.userLanguage || window.navigator.language,	
	host: 'http://' + window.location.host 
};

angular.module('auction', ['ui.bootstrap', 'ngRoute', 'ngTouch']).config(function($routeProvider, $httpProvider, $provide) {
	
    // 'loading' interceptor
    $httpProvider.interceptors.push('blockingInterceptor');
	// a known issue of angular transform response
    $httpProvider.defaults.transformResponse.push(function (data) {
        if (data === "null") {
            data = null;
        }
        return data;
    });
    $routeProvider.when('/', {
		templateUrl: 'views/login.html',
        controller: 'login'
	}).when('/dashboard/:user', {
		templateUrl: 'views/dashboard.html',
        controller: 'dashboard'
	}).otherwise({ redirectTo: '/' });
});
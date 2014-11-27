// authChecker.js

angular.module('wildhacks2014App', ['ngCookies']).run(['$rootScope', '$location', 'Auth', 
	function($rootScope, $location, Auth) {

		// $routeChangeStart is an event that is triggered everytime a route is changed
		$rootScope.on('$routeChangeStart', function(event, next, current) {
			console.log('Changing route...');
			if (!Auth.authorize(next.access)) {
				if (Auth.isLoggedIn()) {
					$location.path('/');
				} else {
					$location.path('/login');
				}
			}
		});
	}]);
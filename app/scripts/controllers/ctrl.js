'use strict';


angular.module('wildhacks2014App')
	.controller('Ctrl', ['$scope', '$location', 'localStorageService', '$rootScope',
		function ($scope, $location, localStorageService, $rootScope) {

		// function that checks whether the local storage (in browser) holds the token
		// if it does, then show "log out" button
		// if not, show "log in" button
		$scope.setLog = function() {
			if (localStorageService.get('token')) {
				$scope.loggedIn = true;
			} else {
				$scope.loggedIn = false;
			}
		};

		// function to log a user out and remove the user token from the browser/ local storage
		$scope.logout = function() {
			// reset the user to an object that just has public viewing ability (role = 1)
			$rootScope.user = { role: 1 };
			// remove the token from local storage
			var success = localStorageService.remove('token');
			console.log(success ? 'token removed' : 'token not removed');
			if (success) {
				// redirect to homepage
				$location.path('/');
				// reset log button
				$scope.setLog();
			}
		};

	}]);

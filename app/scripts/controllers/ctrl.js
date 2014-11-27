'use strict';


angular.module('wildhacks2014App')
	.controller('Ctrl', ['$scope', '$location', 'localStorageService', '$rootScope',
		function ($scope, $location, localStorageService, $rootScope) {

		if (localStorageService.get('token')) {
			$scope.loggedIn = true;
		} else {
			$scope.loggedIn = false;
		}

		$scope.logout = function() {
			$rootScope.user = { role: 1 };
			$scope.loggedIn = !$scope.loggedIn;
			var success = localStorageService.remove('token');
			console.log(success ? 'token removed' : 'token not removed');
			if (success) {
				$location.path('/');
			}
		};

	}]);

'use strict';


angular.module('wildhacks2014App')
	.controller('Ctrl', ['$scope', '$location', 'localStorageService', '$rootScope',
		function ($scope, $location, localStorageService, $rootScope) {

		$scope.loggedIn = true;

		$scope.logout = function() {
			$rootScope.user = { role: 1 };
			$scope.loggedIn = !$scope.loggedIn;
			localStorageService.remove('token');
			$location.path('/');
		};

	}]);

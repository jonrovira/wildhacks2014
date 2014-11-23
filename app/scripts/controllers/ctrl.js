'use strict';


angular.module('wildhacks2014App')
	.controller('Ctrl', function ($scope) {

		$scope.loggedIn = true;

		$scope.logOut = function() {
			$scope.loggedIn = false;
			$scope.$apply();
		}

	});

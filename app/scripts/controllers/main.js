'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wildhacks2014App
 */
angular.module('wildhacks2014App')
  .controller('MainCtrl', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $rootScope, $location) {
    var user = {
    	username: $scope.username,
    	password: $scope.password
    };

    $scope.login = function() {
    	$http.post('/api/mentor/signup', user).success(function(data, status) {
    		if (typeof user === String) {
    			alert(user);
    		} else {
    			console.log(user);
    		}
    	});
    };
  }]);

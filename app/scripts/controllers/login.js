'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the wildhacks2014App
 */

angular.module('wildhacks2014App')
  .controller('LoginCtrl', ['$scope', '$http', '$location', 'localStorageService', '$rootScope',
    function ($scope, $http, $location, localStorageService, $rootScope) {

    $scope.login = function() {
        $scope.user = {
            email: $scope.email,
            password: $scope.password
        };
    	$http
          .post('/login', $scope.user)
          .success(function(data, status, headers, config) {
            // set token in browser storage
            localStorageService.set('token', data.token);
            // set a variable in $rootScope to acknowledge that user is authenticated
            $rootScope.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var profile = JSON.parse(url_base64_decode(encodedProfile));
            // set a property in the rootScope as user so that the user object is available everywhere in the frontend
            $rootScope.user = profile;
            console.log($rootScope.user);
            console.log('Successfully logged in!');
            $location.path('/dashboard');
          })
          .error(function(data, status, headers, config) {
            localStorageService.remove('token');
            alert('Sign up failed!');
          });
    };
  }]);

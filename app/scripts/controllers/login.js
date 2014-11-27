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
            $scope.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var profile = JSON.parse(url_base64_decode(encodedProfile));
            console.log(profile);
            $rootScope.user = profile;
            console.log('Successfully logged in!');
            $location.url('/dashboard');
          })
          .error(function(data, status, headers, config) {
            localStorageService.remove('token');
            console.log('Sign up failed!');
          });
    };
  }]);

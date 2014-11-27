'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # NewCtrl
 * Controller of the wildhacks2014App
 */

function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output);
}


angular.module('wildhacks2014App')
  .controller('NewCtrl', ['$scope', '$http', '$location', 'localStorageService', '$rootScope',
    function ($scope, $http, $location, localStorageService, $rootScope) {

    $scope.submit = function() {
        $scope.user = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password,
            city: $scope.city,
            state: $scope.state,
            school: $scope.school,
            year: $scope.year,
            favSubject: $scope.favSubject,
            major: $scope.major,
            favSport: $scope.favSport,
            hobby: $scope.freeTime,
        };
    	$http
          .post('/signup', $scope.user)
          .success(function(data, status, headers, config) {
            // set token in browser storage
            localStorageService.set('token', data.token);
            $scope.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var profile = JSON.parse(url_base64_decode(encodedProfile));
            console.log(profile);
            $rootScope.user = profile;
            console.log('Successfully signed up!');
          })
          .error(function(data, status, headers, config) {
            localStorageService.remove('token');
            console.log('Sign up failed!');
          });
    };
  }]);

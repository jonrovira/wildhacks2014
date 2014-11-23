'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # MainCtrl
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
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}


angular.module('wildhacks2014App')
  .controller('MainCtrl', ['$scope', '$http', '$location', '$window', 'localStorageService',
    function ($scope, $http, $location, $window, localStorageService) {
    $scope.user = {
        email: $scope.email,
        password: $scope.password
    };
    $scope.login = function() {
        
    	$http
            .post('/authenticate', $scope.user)
            .success(function(data, status, headers, config) {
              //$window.sessionStorage.setItem('token', JSON.stringify(data.token));
    		  //$window.sessionStorage['token'] = JSON.stringify(data.token);
              localStorageService.set('token', data.token);
              $scope.isAuthenticated = true;
              var encodedProfile = data.token.split('.')[1];
              var profile = JSON.parse(url_base64_decode(encodedProfile));
              console.log(profile);
              console.log('Successfully authenticated!');
    	   })
            .error(function(data, status, headers, config) {
                delete $window.sessionStorage.token;
                $scope.message = 'Error: authentication failed';
                console.log('authentication failed!');
            });

        $http.get('/api/restrict').success(function(data, status, headers, config) {
            console.log(data);
        });
    };


  }]);

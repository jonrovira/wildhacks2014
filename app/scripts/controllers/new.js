'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # NewCtrl
 * Controller of the wildhacks2014App
 */

// Fucntion used to decode profile data
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
  .controller('NewCtrl', ['$scope', '$http', '$location', 'localStorageService', '$rootScope', '$upload',
    function ($scope, $http, $location, localStorageService, $rootScope, $upload) {

    // function to handle image upload - not working yet
    // $scope.onFileSelect = function($files) {
    //   for (var i = 0; i < $files.length; i++) {
    //     var file = $files[i];
    //     $scope.upload = $upload.upload({
    //       url: '/upload',
    //       method: 'POST',
    //       file: file
    //     }).progress(function(evt) {
    //       console.log('Percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    //     }).success(function(data, status, headers, config) {
    //       console.log(data.url);
    //       $scope.imgurl = data.url;
    //     });
    //   }
    // };

    // Function that runs when submit is clicked. Submits the new user instance to the backend by using a POST request
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
            // saves the token in browser storage so that it can be used in the headers for future requests
            localStorageService.set('token', data.token);
            $scope.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var profile = JSON.parse(url_base64_decode(encodedProfile));
            // Make the user available in all controllers/scopes 
            $rootScope.user = profile;
            console.log($rootScope.user);
            console.log('Successfully signed up!');
          })
          .error(function(data, status, headers, config) {
            // if error occurs, remove the token from the browser storage in case it was set
            // we don't want anyone who failed the post request to access our restricted API
            localStorageService.remove('token');
            console.log('Sign up failed!');
          });
    };
  }]);

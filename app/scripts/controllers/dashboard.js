'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # DashboardCtrl
 * Controller of the wildhacks2014App
 */

angular.module('wildhacks2014App')
  .controller('DashboardCtrl', ['$scope', '$http', '$location', '$rootScope', 'localStorageService',
    function ($scope, $http, $location, $rootScope, localStorageService) {
      
      // get user information from token
      var token = localStorageService.get('token');
      var encodedProfile = token.split('.')[1];
      var profile = JSON.parse(url_base64_decode(encodedProfile));
      var fullName = profile.firstName + ' ' + profile.lastName;

      // send get request to get all messages from REST API
      $http.get('/api/messages').success(function(data, status) {
        console.log(data);
        $scope.messages = data;
        $scope.userName = fullName;
      });

      $scope.send = function() {
        // create new message object
        console.log($rootScope.message);
        var msg = {
          text: $rootScope.message,
          user: fullName,
          userID: profile._id,
          time: Date.now()
        };

        // send post request to add message to database
        var postedMsg;
        $http.post('/api/messages', msg).success(function(data, status, headers, config) {
          console.log('Message POSTed');
          console.log(data);
          postedMsg = data;
        });

        // send put request to add message id to relationship

      };

  }]);

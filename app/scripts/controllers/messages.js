'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # MessagesCtrl
 * Controller of the wildhacks2014App
 */

// angular.module('wildhacks2014App', [])
//   .factory('Message', function() {
//     return {message: $scope.}
//   })

angular.module('wildhacks2014App')
  .controller('MessagesCtrl', ['$scope', '$http', '$location', '$rootScope', 'localStorageService',
    function ($scope, $http, $location, $rootScope, localStorageService) {
        // watch for changes in ng-model and then update in $rootScope
        // sort of hackish but pretty desparate right now
        $scope.$watch(
          "message.text", function(newValue, oldValue) {
            if (newValue === oldValue) {
              return;
            } else {
              $rootScope.message = newValue;
            }
          })
  }]);

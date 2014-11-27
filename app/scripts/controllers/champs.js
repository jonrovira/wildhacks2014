'use strict';

/**
 * @ngdoc function
 * @name wildhacks2014App.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the wildhacks2014App
 */

angular.module('wildhacks2014App')
  .controller('ChampsCtrl', ['$scope', '$http', '$location', 'localStorageService', '$rootScope',
    function ($scope, $http, $location, localStorageService, $rootScope) {
      console.log('Hello this is the leaderboard');
  }]);

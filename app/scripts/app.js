'use strict';

/**
 * @ngdoc overview
 * @name wildhacks2014App
 * @description
 * # wildhacks2014App
 *
 * Main module of the application.
 */
var app = angular
    .module('wildhacks2014App', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/new', {
                templateUrl: 'views/createProfile.html',
                controller: 'NewCtrl'
            })
            .when('/champs', {
                templateUrl: 'views/leaderboard.html',
            })
            .otherwise({
                redirectTo: '/'
            });
    });

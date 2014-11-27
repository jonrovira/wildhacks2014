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

        // grab accessLevels from the userRoles.js added to index.html
        var access = routingConfig.accessLevels;

        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                access: access.anon
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                access: access.user
            })
            .when('/new', {
                templateUrl: 'views/createProfile.html',
                controller: 'NewCtrl',
                access: access.anon
            })
            .when('/champs', {
                templateUrl: 'views/leaderboard.html',
                access: access.user
            })
            .otherwise({
                redirectTo: '/'
            });
    });

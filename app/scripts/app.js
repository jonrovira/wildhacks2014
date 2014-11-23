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
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
            })
            .when('/new', {
                templateUrl: 'views/createProfile.html',
            })
            .otherwise({
                redirectTo: '/'
            });
    });

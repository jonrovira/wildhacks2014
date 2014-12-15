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
        'LocalStorageModule',
        'angularFileUpload'
    ])
    .config(function ($routeProvider) {

        var userRoles = routingConfig.userRoles;

        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    // function to redirect user to their dashboard if their already logged in
                    // (token already exists in browser, so no need to log in again)
                    checkAuth: function(localStorageService, $location) {
                        if (localStorageService.get('token')) {
                            $location.path('/dashboard');
                        }
                    }
                }
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                resolve: {
                    checkAuth: function(localStorageService, $location) {
                        if (!localStorageService.get('token')) {
                            $location.path('/');
                        }
                    }
                }
            })
            .when('/new', {
                templateUrl: 'views/createProfile.html',
                controller: 'NewCtrl'
            })
            .when('/champs', {
                templateUrl: 'views/leaderboard.html',
                controller: 'ChampsCtrl',
                resolve: {
                    checkAuth: function($q, $location, $rootScope, localStorageService) {
                        // create a promise. Not really sure why we have to use a promise here...
                        var deferred = $q.defer();
                        deferred.resolve();
                        console.log($rootScope.user);
                        // check if the user has permission to access the leaderboard
                        if ($rootScope.user === undefined || $rootScope.user.role === userRoles.public) {
                            $location.path('/');
                        }
                        return deferred.promise;
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });

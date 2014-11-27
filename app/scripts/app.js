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
                //access: access.user
                resolve: function($q, $location, $rootScope) {
                    var deferred = $q.defer();
                    deferred.resolve();
                    console.log('Opening dashboard');
                    if ($rootScope.user.role === 1) {
                        $location.path('/');
                    }
                    return deferred.promise;
                }
            })
            .when('/new', {
                templateUrl: 'views/createProfile.html',
                controller: 'NewCtrl',
                access: access.anon
            })
            .when('/champs', {
                templateUrl: 'views/leaderboard.html',
                controller: 'ChampsCtrl',
                resolve: {
                    checkAuth: function($q, $location, $rootScope) {
                        var deferred = $q.defer();
                        deferred.resolve();
                        console.log($rootScope.user);
                        if ($rootScope.user === undefined || $rootScope.user.role === 1) {
                            $location.path('/');
                        }
                        return deferred.promise;
                    }
                }

                
                //access: access.user
            })
            .otherwise({
                redirectTo: '/'
            });
    });

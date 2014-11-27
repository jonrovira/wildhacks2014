// authInterceptor.js

angular.module('wildhacks2014App').factory('authInterceptor', function ($rootScope, $q, $window, localStorageService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorageService.get('token')) {
        // add token to request header
        config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

angular.module('wildhacks2014App').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
// auth.js
angular.module('wildhacks2014App').factory('Auth', function($http, $rootScope, $cookieStore) {

	var accessLevels = routingConfig.accessLevels,
		userRoles = routingConfig.userRoles,
		currentUser = $cookieStore.get('user') | { firstName: '', lastName: '', role: userRoles.public };

		$rootScope.accessLevels = accessLevels;
		$rootScope.userRoles = userRoles;
		$rootScope.user = currentUser;

		return {

			authorize: function(accessLevel, role) {
				if (role === undefined) {
					role = $rootScope.user.role;
				}
				return accessLevel & role;
			},

			isLoggedIn: function(user) {
				if (user === undefined) {
					user = $rootScope.user;
				}
				return user.role === userRoles.user || user.role === userRoles.admin;
			},

			logout: function(success, error) {
				$rootScope.user = { role: userRoles.public };
			},

			accessLevels: accessLevels;,
			userRoles: userRoles
		};

});
// userRoles.js

(function(exports) {

	var userRoles = {
		public: 1,
		user: 2,
		admin: 4
	};

	var accessLevels = {
		// everyone can access public pages
		public: userRoles.public | userRoles.user | userRoles.admin,
		anon: userRoles.public,
		user: userRoles.user | userRoles.admin,
		admin: userRoles.admin
	};

	// expose publicly
	exports.userRoles = userRoles;
	exports.accessLevels = accessLevels;

})(typeof exports === 'undefined' ? this['routingConfig'] = {}: exports);
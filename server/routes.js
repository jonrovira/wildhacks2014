// routes.js

// include all modules

var Mentor = require('./models/Mentor'),
	Mentee = require('./models/Mentee'),
	Message = require('./models/Message'),
	Relationship = require('./models/Relationship');

module.exports = function(app) {

	// handle Angular frontend routes
	app.get('*', function(req, res) {
		// load public index file
		res.sendfile('./app/index.html');
	});

	/* AUTHENTICATION */

	// Mentors
}
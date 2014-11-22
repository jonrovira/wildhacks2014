// routes.js

module.exports = function(app) {

	// handle Angular routes
	app.get('*', function(req, res) {
		// load public index file
		res.sendfile('./app/index.html');
	});


}
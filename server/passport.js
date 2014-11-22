// passport.js

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	flash = require('connect-flash'),
	Mentor = require('./models/Mentor'),
	Mentee = require('./models/Mentee');

module.exports = function(passport) {

	passport.use('mentor-local-signup', new LocalStrategy(
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			Mentor.findOne({ 'local.email': email }, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash('signupMessage', 'Email already exists!'));
				} else {
					var newMentor = new Mentor();
					newMentor.name = req.body.name;
					newMentor.email = email;
					newMentor.major = req.body.major;
					newMentor.favSport = req.body.favSport;
					newMentor.school = req.body.school;
					newMentor.year = req.body.year;
					newMentor.city = req.body.city;
					newMentor.state = req.body.state;
					newMentor.picture = req.body.picture;
					newMentor.description = req.body.description;

					newMentor.save(function(err) {
						if (err) {
							throw err;
						} else {
							return done(err, newMentor);
						}
					});
				}
			});
		});
	}));
};
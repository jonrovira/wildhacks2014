// routes.js

// include all modules

var User = require('./models/User'),
	Message = require('./models/Message'),
	Relationship = require('./models/Relationship'),
	jwt = require('jsonwebtoken'),
	access = require('../config/userRoles'),
	fs = require('fs'),
	path = require('path');

module.exports = function(app) {

	/* AUTHENTICATION */

	// Handle login
	app.post('/login', function(req, res) {
		// Validate req.body
		if (!req.body) {
			return res.send(401, 'Please enter username and password!');
		}
		User.findOne({ 'email': req.body.email }, function(err, user) {
			// check if some error occurred during database retrieval
			if (err) {
				return res.send(500, err);
			}

			if (!user) {
				return res.send(400, 'Incorrect username!');
			}

			// if (!user.validPassword(req.body.password)) {
			// 	return res.send(400, 'Incorrect password!');
			// }

			// user found, sign token using our secret
			var token = jwt.sign(user, 'nevilandjon', { expiresInMinutes: 300 });
			console.log('Sending token to frontend...');
			// send token to Angular frontend
			res.json({ token: token });
		});
	});

	// handle new user signup
	app.post('/signup', function(req, res) {
		// Validate req.body
		if (!req.body) {
			return res.send(401, 'Please enter username and password!');
		}
		console.log(req.body);
		// Check if user already exists in database by searching for email
		User.findOne({ 'email': req.body.email }, function(err, user) {
			if (err) {
				return res.send(500, err);
			}
			// Send error message if user already exists
			if (user) {
				res.send(404, 'A user with that email already exists!');
			}
			if (!user) {
				// if user doesn't exist, create the user
				var newUser = new User();
				newUser.firstName = req.body.firstName;
				newUser.lastName = req.body.lastName;
				newUser.email = req.body.email;
				newUser.role = access.userRoles.user;
				newUser.password = newUser.generateHash(req.body.password);
				newUser.city = req.body.city;
				newUser.state = req.body.state;
				newUser.school = req.body.school;
				newUser.year = req.body.year;
				newUser.favSubject = req.body.favSubject;
				newUser.major = req.body.major;
				newUser.favSport = req.body.favSport;
				newUser.hobby = req.body.hobby;

				var relationship = new Relationship();
				if (req.body.mentor) {
					relationship.mentor = req.body.firstName + ' ' + req.body.lastName;
				} else {
					relationship.mentee = req.body.firstName + ' ' + req.body.lastName;
				}

				var relationshipID;
				relationship.save(function(err) {
					if (err) {
						return res.send(400, err);
					}
					relationshipID = relationship._id;
				});
				// add relationshipID to the newUser instance
				newUser.relationshipID = relationshipID;

				// save new object to database
				newUser.save(function(err) {
					if (err) {
						return res.send(400, err);
					}
					// once successfully save, sign token using our secret
					var token = jwt.sign(newUser, 'nevilandjon', { expiresInMinutes: 300 });
					console.log('Sending token to frontend...');
					// send the token to our Angular frontend
					res.json({ token: token });
				});
			}
		});
	});

	/* UPLOAD */
	
	app.post('/upload', function(req, res) {
		console.log('backend upload route reached');
		console.log(req);
	});

	/* REST API */

	/* Messages */
	// get all messages
	app.get('/api/messages', function(req, res) {
		// req.user exists here
		Message.find(function(err, messages) {
			if (err) {
				res.send(err);
			}
			res.json(messages);
		});
	});

	// get message by id
	app.get('/api/messages/:id', function(req, res) {
		var id = req.params.id;
		Message.findById(id, function(err, message) {
			if (err) {
				return res.send(500, err);
			}
			if (!message) {
				return res.send(404);
			}

			console.log(message);
			res.json(message);
		});
	});

	// create message
	app.post('/api/messages', function(req, res) {
		if (!req.body) {
			return res.send(404);
		}
		console.log(req.body);
		// instantiate new message with data from req.body and req.user
		var newMessage = new Message();
		newMessage.text = req.body.text;
		newMessage.user = req.body.user;
		newMessage.userID = req.body.userID;
		newMessage.time = Date.now();

		newMessage.save(function(err, msg) {
			if (err) {
				return res.send(500, err);
			}
			res.json(msg);
		});
	});

	// update message by id
	app.put('/api/messages/:id', function(req, res) {
		var id = req.params.id;

		if (!req.body) {
			return res.send(400);
		}

		Message.findById(id, function(err, msg) {
			if (err) {
                // send error message
                return res.send(500, err);
            }
            if (!data) {
                // send error message
                return res.send(404);
            }

            msg.text = req.body.text;

            // save the object after updating
            msg.save(function(err) {
                if (err) {
                    return console.log('error')
                }
                // send the updated msg back to the Angular frontend
                res.json(msg);
            });
		});
	});

	// delete message by id
	app.delete('/api/messages/:id', function(req, res) {
		var id = req.params.id;

		if (!req.body) {
			return res.send(400);
		}

		Message.findById(id, function(err, msg) {
			if (err) {
				return res.send(500, err);
			}

			if (!msg) {
				return res.send(404);
			}

			msg.remove(function(err) {
				if (err) {
					return res.send(500, err);
				}
				res.send(true);
			});
		});
	});

	/* Relationships */
	// get relationship by id
	app.get('/api/relationships/:id', function(req, res) {
		var id = req.params.id;
		Relationship.findById(id, function(err, data) {
			if (err) {
				return res.send(500, err);
			}
			if (!data) {
				return res.send(404);
			}
			res.json(data);
		});
	});

	// create new relationship
	app.post('/api/relationships', function(req, res) {
		if (!req.body) {
			return res.send(400);
		}

		var rel = new Relationship();
		// check if mentor or mentee
		if (req.user.mentor) {
			rel.mentor = req.user.name;
			rel.mentorID = req.user._id;
		} else {
			rel.mentee = req.user.name;
			rel.menteeID = req.user._id;
		}
		// rel.mentor = req.body.mentor;
		// rel.mentee = req.body.mentee;
		rel.messages = []

		rel.save(function(err, rel) {
			if (err) {
				return res.send(500, err);
			}
			res.json(rel);
		});
	});

	// add a message to the relationship
	app.put('/api/relationships/:id', function(req, res) {
		var id = req.params.id;
		console.log(req.body);
		if (!req.body) {
			return res.send(400);
		}

		Relationship.findById(id, function(err, rel) {
			if (err) {
				return res.send(500, err);
			}

			if (!rel) {
				res.send(404);
			}

			// add message to end of messages array
			rel.messages.push(req.body.message);
			// save rel
			rel.save(function(err) {
				if (err) {
					return res.send(500, err);
				}
				// saved, now return updated object
				res.json(rel);
			});
		});
	});

	// all other routes will go to this route, hence placed last
	// handle Angular frontend routes
	app.get('*', function(req, res) {
		// load public index file
		res.sendfile('./app/index.html');
	});

}
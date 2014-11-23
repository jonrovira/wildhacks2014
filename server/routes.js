// routes.js

// include all modules

var User = require('./models/User'),
	Message = require('./models/Message'),
	Relationship = require('./models/Relationship'),
	jwt = require('jsonwebtoken');

module.exports = function(app) {

	app.get('/api/restrict', function(req, res) {
		console.log('You\'re calling restricted routes!');
		res.json({text: 'Nevil George is accessing this'});
	});

	// handle Angular frontend routes
	app.get('*', function(req, res) {
		// load public index file
		res.sendfile('./app/index.html');
	});

	/* AUTHENTICATION */

	// Mentors
	// app.post('/api/mentor/signup', function(req, res) {
	// 	console.log('Backend reached');
	// 	console.log(req.body)
	// 	var email = req.body.email,
	// 		password = req.body.password;

	// 	if (!email || !password) {
	// 		res.send('You must enter an email and a password!');
	// 	}

	// 	Mentor.findOne({ 'email': email }, function(err, user) {
	// 		if (err) {
	// 			return done(err);
	// 		}

	// 		if (user) {
	// 			return res.send('A user with that username already exists!')
	// 		}
	// 	});

	// 	var newMentor = new Mentor();
	// 	newMentor.email = email;
	// 	newMentor.password = password;
	// 	newMentor.save(function(err) {
	// 		if (err) {
	// 			throw err;
	// 		} else {
	// 			console.log('Sending user to frontend');
	// 			return res.send(newMentor);
	// 		}
	// 	});
	// });

	

	app.post('/authenticate', function(req, res) {
		console.log('backend reached');
		if (!req.body) {
			return res.send(404, 'No email or password entered.');
		}
		User.findOne({'email': req.body.email}, function(err, user) {
			if (err) {
				return res.send(500, err);
			}
			var newUser = new User();
			newUser.email = req.body.email;
			newUser.password = req.body.password;
			newUser.save(function(err) {
				if (err) {
					return res.send(400, err);
				}
				var token = jwt.sign(newUser, 'nevilandjon', {expiresInMinutes: 300});
				console.log('Sending token');
				res.json({token: token});
			});
			
		});
	});

	// REST API

	/* Messages */
	// get all messages
	app.get('/api/messages', function(req, res) {
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

		// instantiate new message with data from req.body and req.user
		var newMessage = new Message({
			text: req.body.text,
			user: req.user.name,
			userID: req.user._id,
			time: Date.now()
		});

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

}
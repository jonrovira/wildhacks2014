// User.js
// Data model for both Mentor and Mentee

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	mentor: Boolean,
	firstName: String,
	lastName: String,
	role: String,
	email: String,
	password: String,
	menteeID: mongoose.Schema.ObjectId,
	mentorID: mongoose.Schema.ObjectId,
	relationshipID: mongoose.Schema.ObjectId,
	favSubject: String,
	major: String,
	favSport: String,
	school: String,
	year: String,
	city: String,
	state: String,
	picture: String,
	hobby: String
});

// Encrypt/ hash password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
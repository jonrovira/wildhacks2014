// Mentee.js
// Data model for Mentee

var mongoose = require('mongoose');

var menteeSchema = mongoose.Schema({
	name: String,
	email: String,
	mentor: String,
	mentorID: String,
	favSubject: String,
	favSport: String,
	school: String,
	year: String,
	city: String,
	state: String,
	picture: String,
	description: [String]

});

module.exports = mongoose.model('Mentee', menteeSchema);
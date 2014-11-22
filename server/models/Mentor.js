// Mentor.js
// Data model for Mentor

var mongoose = require('mongoose');

var mentorSchema = new mongoose.Schema({
	name: String,
	email: String,
	mentee: String,
	menteeID: mongoose.Schema.ObjectId,
	major: String,
	favSport: String,
	school: String,
	year: String,
	City: String,
	State: String,
	picture: String,
	description: [String]

});

module.exports = mongoose.model('Mentor', mentorSchema);
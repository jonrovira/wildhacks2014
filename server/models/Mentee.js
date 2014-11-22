// Mentee.js
// Data model for Mentee

var mongoose = require('mongoose');

var menteeSchema = new mongoose.Schema({
	name: String,
	email: String,
	mentor: String,
	mentorID: mongoose.Schema.ObjectId,
	relationshipID: mongoose.Schema.ObjectId,
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
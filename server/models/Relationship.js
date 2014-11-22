// Relationship.js
// Data model for relationships

var mongoose = require('mongoose');

var relationshipSchema = new mongoose.Schema({
	mentor: String,
	mentorID: mongoose.Schema.ObjectId,
	mentee: String,
	menteeID: mongoose.Schema.ObjectId,
	messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Relationship', relationshipSchema);
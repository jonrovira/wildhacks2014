// Message.js
// Data model for messages

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	text: String,
	user: String,
	userID: mongoose.Schema.ObjectId,
	time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Message', messageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	content: String
});

module.exports = mongoose.model('todo', todoSchema, 'todos')
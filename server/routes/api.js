const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');

var db = mongoose.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
	if(err){ console.log(err); }
	else{ console.log('Connected to ' + db); }
});

router.get('/todos', function(req, res){
	console.log('Get request for all todos');
	Todo.find({})
		.exec(function(err, todos){
			if(err){
				console.log("Error retrieving Todos");
			} else {
				res.json(todos);
			}
		});
});

router.post('/todo', function(req, res){
	console.log('Post a Todo');
	var newTodo = new Todo();
	newTodo.content = req.body.content;
	newTodo.save(function(err, insertedTodo){
		if(err){
			console.log('Error saving Todo');
		} else {
			res.json(insertedTodo);
		}
	});
})

module.exports = router;
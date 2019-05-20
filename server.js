const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var router = express.Router();

// var db = mongoose.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
// 	if(err){ console.log(err); }
// 	else{ console.log('Connected to ' + db); }
// });

const api = require('./server/routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const allowed = [
  '.js',
  '.css',
  '.png',
  '.jpg'
];

app.get('*', function(req, res) {
	//res.sendFile(path.join(__dirname, 'dist/meantodo/index.html'));
	if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`dist/meantodo/${req.url}`));
   } else {
      res.sendFile(path.join(__dirname, 'dist/meantodo/index.html'));
   }
});

app.listen(port, function(){
	console.log("Server running on localhost:" + port);
});
//TODO: Add error handling to avoid repeated code
//TODO: Add logger to log to disk and console
//TODO: Add JWT authentication / ldap
//TODO: Add unit testing
//TODO: Create router files
//TODO: create controllers, per entity, one for games.

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//TODO: Add settings file for CS and settings
mongoose.connect('mongodb://localhost/games');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();  // get an instance of the express Router

// middleware to use for all requests
// router.use(function(req, res, next){
//   console.log('Calling request');
//   next();
// });
//
// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.use(function(err, req, res, next){
//   console.log('Error on request1');
//   next(err);
// });

// router.use(function(err, req, res, next){
//   console.log('Error on request 2');
//   console.log(err.status);
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   })
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./controllers'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
//TODO: Add error handling to avoid repeated code
//TODO: Add logger to log to disk and console
//TODO: Add JWT authentication / ldap
//TODO: Add unit testing

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./classes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./controllers'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
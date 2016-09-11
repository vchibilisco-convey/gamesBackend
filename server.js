var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/games');

var Game = require('./app/models/game');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();  // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next){
  console.log('Calling a request');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
  res.json({ message: 'Welcome to the games API'});
});


// more routes for our API will happen here
router.route('/games')
  .post(function(req, res){
    var game = new Game();
    game.name = req.body.name;

    game.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message: 'Game "' + game.name + '" Created'})
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
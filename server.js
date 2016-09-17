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
  console.log('Calling request');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
  res.json({ message: 'Welcome to the games API'});
});


// more routes for our API will happen here
router.route('/games')
  .post(function(req, res, next){
    var game = new Game();
    game.name = req.body.name;

    game.save(function(err){
      if(err){
        return next(err)
      }
      res.json({message: 'Game "' + game.name + '" Created'})
    });
  })
  .get(function(req, res, next){
    Game.find(function(err, games){
      if(err){
        return next(err);
      }
      res.json(games)
    });
  });

router.route('/games/:game_id')
  .get(function(req, res, next){
    Game.findById(req.params.game_id, function(err, game){
      if(err){
        return next(err);
      }
      res.json(game);
    })
  })
  .delete(function(req, res, next){
    Game.remove({
      _id: req.params.game_id
    }, function(err, game){
      var err = new Error();
      err.status = 404;
      if(err){
        return next(err);
      }
      res.json({message: 'game "' + game.name + '" Succesfully deleted.'});
    })
  })
  .put(function(req, res, next){
    Game.findById(req.params.game_id, function(err, game){
      if(err){
        return next(err)
      }
      game.name = req.body.name;
      game.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: 'Game "' + game.id + '" Updated with: "' + game.name + '"'});
      });
    });
  });

router.use(function(err, req, res, next){
  console.log('Error on request1');
  next(err);
});

router.use(function(err, req, res, next){
  console.log('Error on request 2');
  console.log(err.status);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  })
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
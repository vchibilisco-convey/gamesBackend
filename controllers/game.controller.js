var express = require('express');

var router = express.Router();

var Game = require('../classes/game');
var GameModel = require('../models/game.model');

// more routes for our API will happen here
router.route('/')
  .post(function(req, res, next){
    GameModel.create(req.body, function(err, game){
      if(err){
        return next(err)
      }
      res.json({message: 'Game "' + game.name + '" Created'})
    });
  })
  .get(function(req, res, next){
    GameModel.findAll(function (err, games) {
      if(err){
        return next(err);
      }
      res.json(games)
    })
  });

router.route('/:game_id')
  .get(function(req, res, next){
    GameModel.findById(req.params.game_id, function(err, game){
      if(err){
        return next(err);
      }
      res.json(game);
    });
  })
  .delete(function(req, res, next){
    GameModel.deleteById(req.params.game_id, function(err, response){
      if(err){
        return next(err);
      }
      //TODO: check on response to see if it was removed
      res.json({message: 'game succesfully deleted.'});
    });
  })
  .put(function(req, res, next){
    GameModel.updateById(req.params.game_id, req.body, function(err, game){
      if(err){
        return next(err);
      }
      res.json({message: 'Game "' + game.id + '" Updated with: "' + game.name + '"'});
    });
  });

module.exports = router;
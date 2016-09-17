var express = require('express');
var router = express.Router();

router.use('/games', require('./game.controller'));

router.get('/', function(req, res){
  res.json({ message: 'Welcome to the games API'});
});

module.exports = router;
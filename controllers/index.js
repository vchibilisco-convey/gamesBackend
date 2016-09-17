var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
require('../classes');

var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {flags: 'a'});

router.use(morgan('combined', {stream: accessLogStream}));
router.use(require('../middlewares/auth'));
router.use('/games', require('./game.controller'));
router.use(require('../middlewares/error'));

router.get('/', function(req, res){
  res.json({ message: 'Welcome to the games API'});
});

module.exports = router;
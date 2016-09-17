var express = require('express');
var router = express.Router();
require('../classes');

router.use(require('../middlewares/auth'));
router.use(require('../middlewares/log'));
router.use('/games', require('./game.controller'));
router.use(require('../middlewares/error'));

router.get('/', function(req, res){
  res.json({ message: 'Welcome to the games API'});
});

module.exports = router;
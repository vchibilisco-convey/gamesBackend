var express = require('express');
var router = express.Router();
require('../classes');

//Middlewares before requests
router.use(require('../middlewares/accessLog'));
router.use(require('../middlewares/auth'));

//Application routes.
router.get('/', require('./root.controller'));
router.use('/games', require('./game.controller'));

//Middlewares after requests
router.use(require('../middlewares/error'));

module.exports = router;
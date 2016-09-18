var logger = require('../utils/logger');

module.exports = (function(){
  logger.verbose('Starting mongo connection...');
  var mongoose = require('mongoose');
  var cs = 'mongodb://localhost:27017/games';
  mongoose.connect(cs);
  logger.info('Connection established with mongo at: ' + cs);
})()
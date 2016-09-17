module.exports = (function(){
  console.log('Starting mongo connection...');
  var mongoose = require('mongoose');
  var cs = 'mongodb://localhost:27017/games';
  mongoose.connect(cs);
  console.log('Connection established with mongo at: ' + cs);
})()
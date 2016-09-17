module.exports = function(req, res, next){
  //TODO: Research the best attributes to log the requests.
  console.log('Logging request');
  next();
}
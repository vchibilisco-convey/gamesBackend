module.exports = function(err, req, res, next) {
  console.log('Error on request');
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}
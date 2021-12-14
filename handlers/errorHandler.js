function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
}

module.exports = errorHandler;

const jwtError = () => ({
  status: 401,
  message: { error: "token missing or invalid" },
});

function tokenExtractor(request, response, next) {
  const authorization = request.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer "))
    throw jwtError();
  request.token = authorization.substring(7);
  next();
}

module.exports = tokenExtractor;

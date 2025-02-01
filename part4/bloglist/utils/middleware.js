const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const requestLogger = (request, response, next) => {
  console.log("Status: ", response.statusCode);
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");

  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "").trim();
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
  } else {
    request.token = null;
  }
  next();
};

const errorHandler = (request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: 'expected "username" to be unique' });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

module.exports = { requestLogger, errorHandler, tokenExtractor, userExtractor };

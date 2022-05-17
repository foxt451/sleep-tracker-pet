const { NotFoundError } = require("../errors");

const notFoundMiddleware = (req, res) => {
  throw new NotFoundError("Route not found");
};

module.exports = notFoundMiddleware;

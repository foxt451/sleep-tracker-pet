const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const errObj = {
    message: err.message || "Oops, something went wrong...",
    status_code: err.status_code || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  // if CustomError no need for further examining
  if (err instanceof CustomError) {
    return res.status(errObj.status_code).json({ msg: errObj.message });
  }
  return res.status(errObj.status_code).json({ msg: errObj.message });
};

module.exports = errorHandler;

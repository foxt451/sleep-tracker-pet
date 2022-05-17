const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError("Please provide username, password and email");
  }
  const user = await User.create({ username, email, password });
  const token = user.generateToken();
  return res
    .status(StatusCodes.CREATED)
    .json({ token, user: { username, email, id: user._id } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide password and email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User with such email not found");
  }
  if (!(await user.comparePasswords(password))) {
    throw new UnauthorizedError("Incorrect credentials");
  }
  const token = user.generateToken();
  return res
    .status(StatusCodes.OK)
    .json({ token, user: { username: user.username, email, id: user._id } });
};

module.exports = { register, login };

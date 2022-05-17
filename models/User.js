const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    match: [
      /^[a-zA-Z_0-9]{3,25}$/,
      "Username must be a 3 to 25 characters long string with latin letters, underscores and numbers only",
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: [validator.isEmail, "Incorrect email format"],
  },
  password: {
    type: String,
    required: [true, "Please provide an password"],
    validate: [
      validator.isStrongPassword,
      "Password must be at least 8 characters, with a lowercase and uppercase letter, a number and a symbol",
    ],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const jwt = require("jsonwebtoken");
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

UserSchema.methods.comparePasswords = function (candidatePassword) {
  console.log(candidatePassword, this.password);
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

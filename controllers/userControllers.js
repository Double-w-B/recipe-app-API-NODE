const User = require("../models/User");
const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../customErrors");
const { attachCookiesToResponse } = require("../utils");

//! checkCurrentUser
const checkCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
//! checkCurrentUser

//! updateName
const updateName = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError.BadRequestError("Please provide name");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;

  await user.save();

  const tokenUser = { name: user.name, userId: user._id };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
//! updateName

//! updateEmail
const updateEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;

  await user.save();

  const tokenUser = { name: user.name, userId: user._id };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
//! updateEmail

//! updatePassword
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePasswords(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! Password updated!" });
};
//! updatePassword

//! removeUser
const removeUser = async (req, res) => {
  const { userId } = req.body;

  await User.findOneAndRemove({ _id: userId });
  await Recipe.deleteMany({ createdBy: userId });

  res.status(StatusCodes.OK).json({ msg: "User and user's data removed." });
};
//! removeUser

module.exports = {
  checkCurrentUser,
  updateName,
  updateEmail,
  updatePassword,
  removeUser,
};

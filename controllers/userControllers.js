const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const checkCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  getSingleUser,
  checkCurrentUser,
};

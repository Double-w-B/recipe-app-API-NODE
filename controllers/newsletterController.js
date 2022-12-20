const Newsletter = require("../models/Newsletter");
const CustomError = require("../customErrors");
const { StatusCodes } = require("http-status-codes");

const addEmailToDB = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const emailAlreadyExists = await Newsletter.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const addedEmail = await Newsletter.create({ email });

  res.status(StatusCodes.CREATED).json({ addedEmail });
};

const removeEmailFromDB = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const removedEmail = await Newsletter.findOneAndRemove({ email });

  if (!removedEmail) {
    throw new CustomError.NotFoundError(
      `There is no ${email} in our Newsletter`
    );
  }

  res.status(StatusCodes.OK).json({ removedEmail });
};

module.exports = { addEmailToDB, removeEmailFromDB };

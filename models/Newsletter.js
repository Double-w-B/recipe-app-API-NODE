const mongoose = require("mongoose");
const validator = require("validator");

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email"],
      validate: {
        validator: validator.isEmail,
        message: "valid email",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", NewsletterSchema);

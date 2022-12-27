const express = require("express");
const router = express.Router();

const {
  checkCurrentUser,
  updateName,
  updateEmail,
  updatePassword,
  removeUser,
} = require("../controllers/userControllers");

router.route("/checkUser").get(checkCurrentUser);
router.route("/updateUserName").patch(updateName);
router.route("/updateUserEmail").patch(updateEmail);
router.route("/updateUserPassword").patch(updatePassword);
router.route("/removeUser").delete(removeUser);

module.exports = router;

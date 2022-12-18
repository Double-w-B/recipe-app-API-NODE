const express = require("express");
const router = express.Router();

const {
  getSingleUser,
  checkCurrentUser,
} = require("../controllers/userControllers");

router.route("/checkUser").get(checkCurrentUser);
router.route("/:id").get(getSingleUser);

module.exports = router;

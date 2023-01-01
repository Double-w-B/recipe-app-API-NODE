const express = require("express");
const router = express.Router();
const {
  addEmailToDB,
  removeEmailFromDB,
  getSingleEmail,
} = require("../controllers/newsletterController");

router.post("/checkEmail", getSingleEmail);
router.post("/add", addEmailToDB);
router.post("/remove", removeEmailFromDB);

module.exports = router;

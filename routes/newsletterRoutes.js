const express = require("express");
const router = express.Router();
const {
  addEmailToDB,
  removeEmailFromDB,
  checkUserEmailInDb,
} = require("../controllers/newsletterController");

router.post("/checkEmail", checkUserEmailInDb);
router.post("/add", addEmailToDB);
router.delete("/remove", removeEmailFromDB);

module.exports = router;

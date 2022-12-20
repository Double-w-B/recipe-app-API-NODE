const express = require("express");
const router = express.Router();
const {
  addEmailToDB,
  removeEmailFromDB,
} = require("../controllers/newsletterController");

router.post("/add", addEmailToDB);
router.post("/remove", removeEmailFromDB);

module.exports = router;

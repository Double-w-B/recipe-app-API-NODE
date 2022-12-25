const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getSingleRecipe,
  addRecipe,
  deleteRecipe,
} = require("../controllers/recipesController");

router.route("/").get(getAllRecipes).post(addRecipe);
router.route("/:id").get(getSingleRecipe).delete(deleteRecipe);

module.exports = router;

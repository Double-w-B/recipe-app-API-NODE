const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    label: String,
    recipeID: String,
    image: String,
    source: String,
    cuisineType: Array,
    yield: Number,
    dietLabels: Array,
    mealType: Array,
    calories: Number,
    totalTime: Number,
    url: String,
    uri: String,
    healthLabels: Array,
    totalNutrients: Object,
    ingredients: Array,
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);

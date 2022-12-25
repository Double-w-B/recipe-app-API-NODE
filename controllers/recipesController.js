const Recipe = require("../models/Recipe");
const CustomError = require("../customErrors");
const { StatusCodes } = require("http-status-codes");

//!getAllRecipes
const getAllRecipes = async (req, res) => {
  const { userId } = req.user;
  const recipes = await Recipe.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ count: recipes.length, recipes });
};
//!getAllRecipes

//!getSingleRecipe
const getSingleRecipe = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const recipe = await Recipe.findOne({ createdBy: userId, recipeID: id });

  if (!recipe) {
    throw new CustomError.NotFoundError(`No recipe found in DB with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ recipe });
};
//!getSingleRecipe

//!addRecipe
const addRecipe = async (req, res) => {
  const { userId } = req.user;
  const recipeAlreadyExists = await Recipe.findOne({
    ...req.body,
    createdBy: userId,
  });

  if (recipeAlreadyExists) {
    throw new CustomError.BadRequestError("Recipe already exists");
  }
  const recipe = await Recipe.create({ ...req.body, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ recipe });
};
//!addRecipe

//!deleteRecipe
const deleteRecipe = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const recipe = await Recipe.findOneAndRemove({
    createdBy: userId,
    recipeID: id,
  });

  if (!recipe) {
    throw new CustomError.NotFoundError(`No recipe found with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ removedRecipe: recipe });
};
//!deleteRecipe

module.exports = { getAllRecipes, getSingleRecipe, addRecipe, deleteRecipe };

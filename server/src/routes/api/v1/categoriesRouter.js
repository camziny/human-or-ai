import express from "express";
import { ValidationError } from "objection";
import { Category } from "../../../models/index.js";
import CategorySerializer from "../../../serializers/CategorySerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import categoryQuizzesRouter from "./categoryQuizzesRouter.js";

const categoriesRouter = new express.Router();

categoriesRouter.use("/:categoryId/quizzes", categoryQuizzesRouter);

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.query();
    const serializedCategories = await Promise.all(
      categories.map(async (category) => await CategorySerializer.getSummary(category))
    );
    return res.status(200).json({ categories: serializedCategories });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

categoriesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.query().findById(id);
    const serializedCategory = await CategorySerializer.getDetails(category);
    return res.status(200).json({ category: serializedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

categoriesRouter.post("/", async (req, res) => {
  const cleanedFormInput = cleanUserInput(req.body);
  const { id, name, description } = cleanedFormInput;
  try {
    const newCategory = await Category.query().insertAndFetch({
      id,
      name,
      description,
    });
    const serializedCategory = await CategorySerializer.getSummary(newCategory);
    return res.status(201).json({ category: serializedCategory });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default categoriesRouter;

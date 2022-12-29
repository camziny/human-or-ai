import express from "express";
import { Quiz } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import quizVotesRouter from "./quizVotesRouter.js";
import QuizSerializer from "../../../serializers/QuizSerializer.js";

const quizzesRouter = new express.Router();

quizzesRouter.use("/:id/votes", quizVotesRouter);
quizzesRouter.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.query();
    const serializedQuizzes = await Promise.all(
      quizzes.map(async (attraction) => await QuizSerializer.getSummary(quiz))
    );
    return res.status(200).json({ quizzes: serializedQuizzes });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

quizzesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.query().findById(id);
    const serializedQuiz = await QuizSerializer.getSummary(quiz);
    return res.status(200).json({ quiz: serializedQuiz });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default quizzesRouter;

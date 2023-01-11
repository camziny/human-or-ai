import express from "express";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Quiz } from "../../../models/index.js";
import QuizSerializer from "../../../serializers/QuizSerializer.js";

const categoryQuizzesRouter = new express.Router({ mergeParams: true });

categoryQuizzesRouter.post("/", async (req, res) => {
  const { title, content, rating } = cleanUserInput(req.body);
  const { categoryId } = req.params;
  const userId = req.user.userId;

  try {
    const newQuiz = await Quiz.query().insertAndFetch({
      content,
      answer,
      categoryId,
      userId,
    });
    await newQuiz.$relatedQuery("votes").insert({ userId, quizId: newQuiz.id, score: 1 });
    const serializedQuiz = await QuizSerializer.getSummary(newQuiz);
    return res.status(201).json({ quiz: serializedQuiz });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default categoryQuizzesRouter;

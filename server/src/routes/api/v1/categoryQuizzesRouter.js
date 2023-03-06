import express from "express";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Quiz } from "../../../models/index.js";
import QuizSerializer from "../../../serializers/QuizSerializer.js";
import uploadImage from "../../../services/uploadImage.js";

const categoryQuizzesRouter = new express.Router({ mergeParams: true });

categoryQuizzesRouter.post("/", uploadImage.single("content"), async (req, res) => {
  const { prompt, answer } = cleanUserInput(req.body);
  const { categoryId } = req.params;
  const userId = req.user.id;

  try {
    const newQuiz = await Quiz.query().insertAndFetch({
      content: req.file.location,
      prompt,
      answer,
      categoryId,
      userId,
    });
    await newQuiz.$relatedQuery("votes").insert({ userId, quizId: newQuiz.id, score: 1 });
    const serializedQuiz = await QuizSerializer.getSummary(newQuiz);
    return res.status(201).json({ quiz: serializedQuiz });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default categoryQuizzesRouter;

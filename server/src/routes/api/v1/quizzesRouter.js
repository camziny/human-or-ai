import express from "express";
import { Quiz } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import quizVotesRouter from "./quizVotesRouter.js";

const quizzesRouter = new express.Router();

quizzesRouter.use("/:id/votes", quizVotesRouter);
quizzesRouter.delete("/:id", async (req, res) => {
  try {
    const quizToDelete = await Quiz.query().findById(req.params.id);
    if (req.user && quizToDelete.userId === req.user.id) {
      await quizToDelete.$relatedQuery("votes").delete();
      await quizToDelete.$query().delete();
      res.status(200).json({ message: "This question was successfully deleted " });
    } else {
      res.status(401).json({ "AuthorizationError:": "User not authorized to delete question" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

quizzesRouter.patch("/:id", async (req, res) => {
  const { content } = req.body;
  const { prompt, answer } = cleanUserInput(req.body);

  try {
    if (!answer) {
      return res.status(422).json({ "Error:": "Prompt and Answer field must have a value" });
    }

    const quizToEdit = await Quiz.query().findById(req.params.id);
    if (quizToEdit.userId === req.user.id) {
      const updatedQuiz = await Quiz.query().patchAndFetchById(req.params.id, {
        content,
        prompt,
        answer,
      });
      res.status(200).json({ quiz: updatedQuiz });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default quizzesRouter;

import express from "express";
import VoteSerializer from "../../../serializers/VoteSerializer";
import { Vote } from "../../../models/index.js";

const quizVotesRouter = new express.Router({ mergeParams: true });

quizVotesRouter.put("/:voteId", async (req, res) => {
  const { voteVal } = req.body;
  const { voteId } = req.params;
  const quizId = req.params.id;

  try {
    if (req.user) {
      let newVote;
      const parsedVoteId = parseInt(voteId);
      if (parsedVoteId) {
        const vote = await Vote.query().findById(parsedVoteId);
        if (vote.score === voteVal) {
          newVote = await vote.$query().patchAndFetch({ score: 0 });
        } else {
          newVote = await vote.$query().patchAndFetch({ score: voteVal });
        }
      } else {
        newVote = await Vote.query().insertAndFetch({
          quizId,
          userId: req.user.id,
          score: voteVal,
        });
      }
      const serializedVote = await VoteSerializer.getSummary(newVote);
      res.status(200).json({ vote: serializedVote });
    } else {
      res.status(401).json({ "AuthorizationError:": "User not authorized" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

export default quizVotesRouter;

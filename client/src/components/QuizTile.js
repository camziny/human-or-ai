import React from "react";
import { Link } from "react-router-dom";
import QuizVote from "./QuizVote.js";

const QuizTile = ({
  id,
  content,
  answer,
  curUserId,
  userLoggedIn,
  userVote,
  submitVote,
  votes,
  creator,
  creatorId,
}) => {
  let totalScore = 0;
  votes.forEach((vote) => (totalScore += vote.score));
  return (
    <div className="quiz-tile">
      <Link to={`/quizzes/${id}`}>{content}</Link>
      <div className="quiz-answer">{answer}</div>
      <QuizVote
        quizId={id}
        userLoggedIn={userLoggedIn}
        totalScore={totalScore}
        userVote={userVote}
        submitVote={submitVote}
      />
    </div>
  );
};

export default QuizTile;

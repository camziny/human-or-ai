import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizVote from "./QuizVote.js";
import EditQuizForm from "./EditQuizForm.js";

const QuizTile = ({
  id,
  content,
  answer,
  deleteQuiz,
  patchQuiz,
  errors,
  curUserId,
  userLoggedIn,
  userHasVoted,
  userVote,
  submitVote,
  votes,
  creator,
  creatorId,
  numOfVotes,
  nextQuiz,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [reveal, setReveal] = useState(false);

  const revealAnswer = () => {
    setReveal(!reveal);
    setTimeout(nextQuiz, 2500);
  };

  const buttons =
    creatorId === curUserId ? (
      <div className="review-edit-delete">
        {/* <input
          className="button"
          type="button"
          value="Edit"
          onClick={() => {
            toggleEdit();
          }}
        /> */}
        <input
          className="button"
          type="button"
          value="Delete"
          onClick={() => {
            deleteQuiz(id);
          }}
        />
      </div>
    ) : null;

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  let totalScore = 0;
  votes.forEach((vote) => (totalScore += vote.score));

  let humanScore = 0;
  votes.forEach((vote) => {
    if (vote.score === 1) {
      humanScore += 1;
    }
  });

  let aiScore = 0;
  votes.forEach((vote) => {
    if (vote.score === -1) {
      aiScore += 1;
    }
  });

  const humanAvg = Math.round((humanScore / numOfVotes) * 100);

  const aiAvg = Math.round((aiScore / numOfVotes) * 100);

  const quizImage = content ? (
    <div>
      <img className="quiz-image" src={content}></img>
    </div>
  ) : null;

  if (isBeingEdited) {
    return (
      <EditQuizForm
        patchQuiz={patchQuiz}
        id={id}
        content={content}
        toggleEdit={toggleEdit}
        errors={errors}
      />
    );
  }

  return (
    <div className="quiz-tile">
      <h4>{quizImage}</h4>
      <QuizVote
        quizId={id}
        userLoggedIn={userLoggedIn}
        userHasVoted={userHasVoted}
        totalScore={totalScore}
        userVote={userVote}
        submitVote={submitVote}
        voteSubmitted={revealAnswer}
      />
      <div className="quiz-answer">
        {reveal ? <div className="answer-show">Answer: {answer}</div> : null}
        {reveal ? (
          <div className="human-avg-show">
            {humanAvg}% of users guessed that this was created by a human.
          </div>
        ) : null}
        {reveal ? (
          <div className="ai-avg-show">
            {" "}
            {aiAvg}% of users guessed that this was created by a AI.
          </div>
        ) : null}
        {buttons}
      </div>
    </div>
  );
};

export default QuizTile;

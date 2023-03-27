import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizVote from "./QuizVote.js";
import EditQuizForm from "./EditQuizForm.js";

const QuizTile = ({
  id,
  content,
  prompt,
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
    setReveal(true);
    setTimeout(nextQuiz, 2500);
  };

  const buttons =
    creatorId === curUserId ? (
      <div className="review-edit-delete">
        <input
          className="quiz-delete-button"
          type="button"
          value="Delete Item"
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
        prompt={prompt}
        toggleEdit={toggleEdit}
        errors={errors}
      />
    );
  }

  return (
    <div className="quiz-tile">
      <div className="quiz-prompt">{prompt}</div>
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
            <span className="human-avg-percent">{humanAvg}%</span> of users guessed human
          </div>
        ) : null}
        {reveal ? (
          <div className="ai-avg-show">
            {" "}
            <span className="ai-avg-percent">{aiAvg}%</span> of users guessed AI
          </div>
        ) : null}
        {buttons}
      </div>
    </div>
  );
};

export default QuizTile;

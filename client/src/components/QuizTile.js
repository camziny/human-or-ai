import React, { useState } from "react";
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
  userVote,
  submitVote,
  votes,
  creator,
  creatorId,
  numOfVotes,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const buttons =
    creatorId === curUserId ? (
      <div className="review-edit-delete">
        <input
          className="button"
          type="button"
          value="Edit"
          onClick={() => {
            toggleEdit();
          }}
        />
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

  const show = (event) => {
    setIsShown((curr) => !curr);
  };

  let totalScore = 0;
  votes.forEach((vote) => (totalScore += vote.score));

  let avg = 0;
  votes.forEach((vote) => (avg += vote.score / numOfVotes));

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
      {/* <p>{numOfVotes}</p> */}
      <QuizVote
        quizId={id}
        userLoggedIn={userLoggedIn}
        totalScore={totalScore}
        userVote={userVote}
        submitVote={submitVote}
      />
      <div className="quiz-answer">
        <p>{avg * 100}% of users guessed that this was created by a human</p>
        <p>Answer: {answer}</p>
        {buttons}
      </div>
    </div>
  );
};

export default QuizTile;

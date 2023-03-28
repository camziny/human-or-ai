import React, { useState } from "react";

const QuizVote = (props) => {
  const [show, setShow] = useState(true);

  const humanVote =
    props.userLoggedIn && !props.userVote ? (
      <input
        type="button"
        value="Human"
        className={props.userVote && props.userVote.score === 1 ? "vote-select-human" : ""}
        onClick={() => {
          props.submitVote(props.quizId, props.userVote, 1);
          setShow(false);
          props.voteSubmitted();
        }}
      />
    ) : null;

  const aiVote =
    props.userLoggedIn && !props.userVote ? (
      <input
        type="button"
        value="AI"
        className={props.userVote && props.userVote.score === -1 ? "vote-select-ai" : ""}
        onClick={() => {
          props.submitVote(props.quizId, props.userVote, -1);
          setShow(false);
          props.voteSubmitted();
        }}
      />
    ) : null;

  const displayVote =
    props.userLoggedIn && props.voteSubmitted && props.userVote ? (
      <input
        type="button"
        value={props.userVote.score === -1 ? "You voted AI" : "You voted Human"}
        className="display-vote-button"
      />
    ) : null;

  const continueButton =
    props.userLoggedIn && props.voteSubmitted && props.userVote ? (
      <input
        type="button"
        value="Show Results"
        className="continue-button"
        onClick={() => {
          props.voteSubmitted();
        }}
      />
    ) : null;

  return (
    <div className="quiz-vote-container">
      <div className="quiz-voting-area">
        {show ? <div className="human-vote-button">{humanVote}</div> : null}
        {show ? <div className="ai-vote-button">{aiVote}</div> : null}
      </div>
      {show ? (
        <div className="display-vote-button-area">
          <div className="display-vote-button-container">{displayVote}</div>
          <div className="continue-button-container">{continueButton}</div>
        </div>
      ) : null}
    </div>
  );
};

export default QuizVote;

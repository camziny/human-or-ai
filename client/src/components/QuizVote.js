import React, { useState } from "react";

const QuizVote = (props) => {
  const humanVote = props.userLoggedIn ? (
    <input
      type="button"
      value="Human"
      className={props.userVote && props.userVote.score === 1 ? "green" : ""}
      onClick={() => {
        props.submitVote(props.quizId, props.userVote, 1);
      }}
    />
  ) : null;

  const aiVote = props.userLoggedIn ? (
    <input
      type="button"
      value="AI"
      className={props.userVote && props.userVote.score === -1 ? "red" : ""}
      onClick={() => {
        props.submitVote(props.quizId, props.userVote, -1);
        props.showAnswer();
      }}
    />
  ) : null;

  return (
    <div className="quiz-voting-area">
      <div className="human-vote-button">{humanVote}</div>
      <div className="score-wrapper"></div>
      {/* <p>{props.totalScore || 0}</p> */}
      <div className="ai-vote-button">{aiVote}</div>
    </div>
  );
};

export default QuizVote;

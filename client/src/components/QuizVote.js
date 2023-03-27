import React, { useState } from "react";

const QuizVote = (props) => {
  const [show, setShow] = useState(true);

  const humanVote = props.userLoggedIn ? (
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

  const aiVote = props.userLoggedIn ? (
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

  // const displayVote = props.voteSubmitted ? (
  //   <input type="button" value={props.userVote.score === -1 ? "You voted AI" : "You voted Human"} />
  // ) : null;

  return (
    <div className="quiz-voting-area">
      {show ? <div className="human-vote-button">{humanVote}</div> : null}
      <div className="score-wrapper"></div>
      {show ? <div className="ai-vote-button">{aiVote}</div> : null}
      {/* {show ? <div className="display-vote-button">{displayVote}</div> : null} */}
    </div>
  );
};

export default QuizVote;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import QuizTile from "./QuizTile";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList.js";
import NewQuizForm from "./NewQuizForm";
import { Info } from "@material-ui/icons";
import { HighlightOffOutlined } from "@material-ui/icons";

const CategoryShowPage = (props) => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
    description: "",
    quizzes: [],
  });
  const [errors, setErrors] = useState({});

  const addNewQuiz = (quiz) => {
    setCategory({ ...category, quizzes: [...category.quizzes, quiz] });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const nextQuiz = () => {
    if (quizTiles[currentQuiz].totalScore !== 0) {
      setCurrentQuiz(currentQuiz + 1);
    }
  };

  const getCategory = async () => {
    try {
      const response = await fetch(`/api/v1/categories/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const categoryData = await response.json();
      setCategory(categoryData.category);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`/api/v1/quizzes/${quizId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        if (response.status === 401) {
          const body = await response.json();
          return setErrors(body);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const filteredQuizzes = category.quizzes.filter((quiz) => {
          return quiz.id !== quizId;
        });
        setErrors({});
        setCategory({ ...category, quizzes: filteredQuizzes });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const patchQuiz = async (quizBody, quizId) => {
    try {
      const response = await fetch(`/api/v1/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedQuizzesWithErrors = category.quizzes.map((quizId) => {
            if (quiz.id === quizId) {
              quiz.errors = body;
            }
            return quiz;
          });
          setCategory({ ...category, quizzes: updatedQuizzesWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedQuizzes = category.quizzes.map((quiz) => {
          if (quiz.id === quizId) {
            quiz.content = body.quiz.content;
            quiz.answer = body.quiz.answer;
            if (quiz.errors) {
              delete quiz.errors;
            }
          }
          return quiz;
        });
        setErrors({});
        setCategory({ ...category, quizzes: updatedQuizzes });
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
      return false;
    }
  };

  const submitVote = async (quizId, vote, voteVal) => {
    let voteId;
    if (!vote) {
      voteId = 0;
    } else {
      voteId = vote.id;
    }
    try {
      const quizToUpdate = category.quizzes.find((quiz) => quiz.id === quizId);
      const response = await fetch(`/api/v1/quizzes/${quizId}/votes/${voteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteVal: voteVal }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const body = await response.json();
          setErrors({ body });
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const voteToUpdate = quizToUpdate.votes.find((vote) => vote.id === voteId);
        let updatedQuizzes;
        if (voteToUpdate) {
          updatedQuizzes = category.quizzes.map((quiz) => {
            if (quiz.id === quizId) {
              quiz.votes = [...quiz.votes.filter((vote) => vote.id !== voteId), body.vote];
            }
            return quiz;
          });
        } else {
          updatedQuizzes = category.quizzes.map((quiz) => {
            if (quiz.id === quizId) {
              quiz.votes = [...quiz.votes, body.vote];
            }
            return quiz;
          });
        }
        setErrors({});
        setCategory({ ...category, quizzes: updatedQuizzes });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const adminUsers = ["cameronziny@gmail.com", "humanoraiadmin@gmail.com"];

  const quizForm = adminUsers.map((userObject) => {
    let curUserAdminCheck = null;
    if (props.user) {
      curUserAdminCheck = props.user.email;
      if (curUserAdminCheck === userObject) {
        return <NewQuizForm key={id} categoryId={id} addNewQuiz={addNewQuiz} />;
      }
    }
  });

  const quizTiles = category.quizzes.map((quizObject) => {
    let curUserId = null;
    let userLoggedIn = false;
    if (props.user) {
      curUserId = props.user.id;
      userLoggedIn = true;
    }
    // const userSelection = quizObject.votes.find((vote) => vote.userId === curUserId);
    // if (userSelection.score === 1 && quizObject.answer == "Human") {
    //   setUserScore(+1);
    // } else {
    //   if (userSelection.score === -1 && quizObject.answer === "AI") {
    //     setUserScore(+1);
    //   }
    // }
    // const userSelection = quizObject.votes.find((vote) => vote.userId === curUserId);
    // console.log(userSelection.score);
    // console.log(quizObject.answer);
    return (
      <QuizTile
        {...quizObject}
        key={quizObject.id}
        creatorId={quizObject.userId}
        creator={quizObject.user}
        curUserId={curUserId}
        userLoggedIn={userLoggedIn}
        userVote={quizObject.votes.find((vote) => vote.userId === curUserId)}
        submitVote={submitVote}
        patchQuiz={patchQuiz}
        deleteQuiz={deleteQuiz}
        numOfVotes={quizObject.votes.length}
        nextQuiz={nextQuiz}
      />
    );
  });

  const categoryName = category.name ? <div className="category-name">{categoryName}</div> : null;

  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="quiz-section">
      <a className="info-icon" onClick={toggleInstructions}>
        {showInstructions ? <HighlightOffOutlined /> : <Info />}
      </a>
      {showInstructions ? (
        <div className="quiz-section-header">
          For each image, vote whether you think it was created by a human or by artificial
          intelligence.
        </div>
      ) : null}
      <div className="quiz-tiles">
        {currentQuiz === quizTiles.length - 1 ? (
          <Link to="/categories" className="finish-category-button">
            Finish
          </Link>
        ) : (
          quizTiles[currentQuiz]
        )}
      </div>
      {quizForm}
    </div>
  );
};

export default CategoryShowPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizTile from "./QuizTile";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList.js";

const CategoryShowPage = (props) => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
    description: "",
    quizzes: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCategory();
  }, []);

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

  const quizTiles = category.quizzes
    .map((quizObject) => {
      let curUserId = null;
      let userLoggedIn = false;
      if (props.user) {
        curUserId = props.user.id;
        userLoggedIn = true;
      }
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
        />
      );
    })
    .sort((quizA, quizB) => {
      return quizB.props.totalScore - quizA.props.totalScore;
    });

  const categoryName = category.name ? <div className="category-name">{categoryName}</div> : null;

  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return <div className="quiz-section">{quizTiles}</div>;
};

export default CategoryShowPage;

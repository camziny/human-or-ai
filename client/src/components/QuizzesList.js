import React, { useState, useEffect } from "react";
import QuizTile from "./QuizTile";

const QuizzesList = async () => {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    try {
      const response = await fetch("/api/v1/quizzes");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setQuizzes(parsedResponse.quizzes);
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const quizTileComponents = quizzes.map((quizObject) => {
    return <QuizTile key={`quizTile-${quizObject.id}`} {...quizObject} />;
  });

  return <div className="quiz-list-header">{quizTileComponents}</div>;
};

export default QuizzesList;

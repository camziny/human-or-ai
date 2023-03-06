import React, { useState, useEffect } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";

const NewQuizForm = (props) => {
  const [newQuiz, setNewQuiz] = useState({
    answer: "",
    prompt: "",
    content: {},
  });
  const [errors, SetErrors] = useState({});
  const [uploadedImage, setUpLoadedImage] = useState({
    preview: "",
  });

  const postQuiz = async () => {
    let preFetchErrors = {};
    if (!newQuiz.content) {
      preFetchErrors.Content = "must include content";
    }
    if (!newQuiz.answer) {
      preFetchErrors.Answer = "must include answer";
    }
    if (Object.keys(preFetchErrors).length) return SetErrors(preFetchErrors);
    else SetErrors({});

    const { categoryId } = props;

    try {
      const body = new FormData();
      body.append("content", newQuiz.content);
      body.append("prompt", newQuiz.prompt);
      body.append("answer", newQuiz.answer);
      const response = await fetch(`/api/v1/categories/${categoryId}/quizzes`, {
        method: "POST",
        headers: { Accept: "image/jpeg" },
        body: body,
      });
      if (response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return SetErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewQuiz(body.quiz);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewQuiz({ ...newQuiz, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postQuiz(newQuiz);
    clearForm();
  };

  const handleImageUpload = (acceptedImage) => {
    setNewQuiz({
      ...newQuiz,
      content: acceptedImage[0],
    });

    setUpLoadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
    });
  };

  const clearForm = () => {
    setNewQuiz({
      content: {},
      prompt: "",
      answer: "",
    });
    setUpLoadedImage({
      preview: "",
    });
  };

  return (
    <div className="new-quiz-form-container">
      <div className="new-quiz-form-container-header">Add Content To This Category</div>
      <ErrorList errors={errors} />
      <form className="new-quiz-form" onSubmit={handleSubmit}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="button-group">
                  <input
                    className="quiz-form-add-image-button"
                    type="add"
                    onChange={handleInputChange}
                    value="Add Image"
                  />
                  <div className="drag-n-drop">
                    <ul>(Click to add, or drag and drop)</ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <img src={uploadedImage.preview} />
        <label className="quiz-form-prompt-label">
          Prompt:
          <input
            name="prompt"
            placeholder="Description"
            className="quiz-form-answer-input-field"
            onChange={handleInputChange}
            value={newQuiz.prompt}
          />
        </label>
        <label className="quiz-form-answer-label">
          Answer:
          <input
            name="answer"
            placeholder="Human or AI"
            className="quiz-form-answer-input-field"
            onChange={handleInputChange}
            value={newQuiz.answer}
          />
        </label>
        <input className="new-quiz-form-submit-button" type="submit" />
      </form>
    </div>
  );
};

export default NewQuizForm;

import React, { useState } from "react";
import ErrorList from "./layout/ErrorList.js";
import Dropzone from "react-dropzone";

const EditQuizForm = (props) => {
  const [editQuiz, setEditQuiz] = useState({
    content: props.content,
    answer: props.answer,
  });

  const handleInputChange = (event) => {
    setEditQuiz({
      ...editQuiz,
      [event.currentTarget.answer]: event.currentTarget.value,
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await props.patchQuiz(editQuiz.props.id)) {
      props.toggleEdit();
    }
  };

  const errorList = props.errors ? <ErrorList errors={props.errors} /> : null;

  return (
    <div>
      <h1>Update Item</h1>
      {errorList}
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="button-group">
                  <input className="button" type="add" onChange={handleInputChange} value="Add" />
                </div>
                <div className="drag-n-drop">
                  <ul>(Click to add, or drag and drop)</ul>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <label>
          Answer:
          <textarea name="answer" onChange={handleInputChange} value={editQuiz.answer} />
        </label>
        <input type="submit" value="Update Item" />
      </form>
    </div>
  );
};

export default EditQuizForm;

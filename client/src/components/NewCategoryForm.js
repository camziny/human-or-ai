import React, { useState, useEffect } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";

const NewCategoryForm = (props) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const postCategory = async () => {
    try {
      const response = await fetch("/api/v1/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      console.log(newCategory);
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewCategory(body.category);
        clearForm();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewCategory({
      ...newCategory,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postCategory(newCategory);
  };

  const clearForm = () => {
    setNewCategory({
      name: "",
      description: "",
    });
  };

  return (
    <div className="new-category-form">
      <div className="new-category-form-header">Add a Category</div>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label className="new-category-name">
          Name:
          <input
            className="category-name-input"
            type="text"
            name="name"
            placeholder="type of content"
            onChange={handleInputChange}
            value={newCategory.name}
          />
        </label>
        <label className="new-category-description">
          Description:
          <input
            className="category-description-input"
            type="text"
            name="description"
            placeholder="category description"
            onChange={handleInputChange}
            value={newCategory.description}
          />
        </label>
        <input className="new-category-form-add-button" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default NewCategoryForm;

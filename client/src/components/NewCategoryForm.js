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
    const { id } = props;
    try {
      const response = await fetch(`/api/v1/categories/${id}`, {
        method: "POST",
        headers: { Content: "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        clearForm();
        props.addNewCategory(body.category);
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
      <h4>Add a Category</h4>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="type of content"
            onChange={handleInputChange}
            value={newCategory.name}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            placeholder="category description"
            onChange={handleInputChange}
            vale={newCategory.description}
          />
        </label>
        <input className="button" type="submit" value="Add Category" />
      </form>
    </div>
  );
};

export default NewCategoryForm;

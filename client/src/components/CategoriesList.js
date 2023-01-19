import React, { useState, useEffect } from "react";
import CategoryTile from "./CategoryTile";
import NewCategoryForm from "./NewCategoryForm";

const CategoriesList = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/v1/categories");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setCategories(parsedResponse.categories);
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  const addNewCategory = (category) => {
    setCategories([...categories, category]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryTileComponents = categories.map((categoryObject) => {
    return <CategoryTile key={`categoryTile-${categoryObject.id}`} {...categoryObject} />;
  });

  // const categoryForm = props.user ? <NewCategoryForm addNewCategory={addNewCategory} /> : null;

  return (
    <div className="category-list-header">
      {/* <div className="categories-list-form">{categoryForm}</div> */}
      <div className="categories-list-header">Categories</div>
      <div className="categories-list-components">{categoryTileComponents}</div>
    </div>
  );
};

export default CategoriesList;

import React, { useState, useEffect } from "react";
import CategoryTile from "./CategoryTile";

const CategoriesList = async () => {
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
      setCategories(parsedResponse.quizzes);
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryTileComponents = categories.map((quizObject) => {
    return <CategoryTile key={`categoryTile-${categoryObject.id}`} {...categoryObject} />;
  });

  return <div className="category-list-header">{categoryTileComponents}</div>;
};

export default CategoriesList;

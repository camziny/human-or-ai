import React, { useState, useEffect } from "react";
import CategoryTile from "./CategoryTile";

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

  useEffect(() => {
    getCategories();
  }, []);

  const categoryTileComponents = categories.map((categoryObject) => {
    return <CategoryTile key={`categoryTile-${categoryObject.id}`} {...categoryObject} />;
  });

  return (
    <div className="category-list-header">
      <div className="categories-list">
        <div>Categories:</div>
        {categoryTileComponents}
      </div>
    </div>
  );
};

export default CategoriesList;

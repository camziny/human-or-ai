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

  const adminUsers = ["cameronziny@gmail.com", "humanoraiadmin@gmail.com"];

  const categoryForm = adminUsers.map((userObject) => {
    let curUserAdminCheck = null;
    if (props.user) {
      curUserAdminCheck = props.user.email;
      if (curUserAdminCheck === userObject) {
        return <NewCategoryForm addNewCategory={addNewCategory} />;
      }
    }
  });

  return (
    <div className="category-list-header">
      <div className="categories-list-header">Categories</div>
      <div className="categories-list-components">{categoryTileComponents}</div>
      {categoryForm}
    </div>
  );
};

export default CategoriesList;

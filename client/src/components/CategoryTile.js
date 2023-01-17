import React from "react";
import { Link } from "react-router-dom";

const CategoryTile = ({ id, name, description }) => {
  return (
    <div className="inline-list">
      <Link to={`/categories/${id}`}>{name}</Link>
      {/* <p>- {description}</p> */}
    </div>
  );
};

export default CategoryTile;

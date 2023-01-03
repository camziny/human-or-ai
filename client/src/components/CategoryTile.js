import React from "react";
import { Link } from "react-router-dom";

const CategoryTile = ({ id, name }) => {
  return (
    <div className="inline-list">
      <Link to={`/categories/${id}`}>{name}</Link>
    </div>
  );
};

export default CategoryTile;

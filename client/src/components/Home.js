import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="play-now">
      <Link to="/categories" className="play-now-header">
        Play Now
      </Link>
    </div>
  );
};
export default Home;

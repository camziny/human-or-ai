import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page-container">
      <div className="logo-container">
        <Link to="categories">
          <img
            className="home-logo"
            src="https://trip-production.s3.amazonaws.com/06f2fce5ae884c34b74075832197cfd1.png"
            alt=""
          />
        </Link>
      </div>
      <div className="play-now">
        <Link to="/categories" className="play-now-header">
          Play Now
        </Link>
      </div>
    </div>
  );
};
export default Home;

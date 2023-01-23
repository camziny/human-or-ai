import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const unauthenticatedItems = [
    <div className="unauthenticated-items-container">
      <div className="unauth-welcome">
        <h2>Welcome to</h2>
        <img
          className="home-logo"
          src="https://trip-production.s3.amazonaws.com/06f2fce5ae884c34b74075832197cfd1.png"
          alt=""
        />
      </div>
      <div className="home-page-register-header">Before we can continue, please either:</div>
      <li key="home-page-sign-in">
        <Link to="/user-sessions/new" className="home-sign-in-link">
          Sign In
        </Link>
      </li>
      <div className="home-page-or"> or </div>

      <li key="home-page-sign-up">
        <Link to="/users/new" className="home-sign-up-link">
          Sign Up
        </Link>
      </li>
    </div>,
  ];

  const authenticatedItems = [
    <div className="logo-container">
      <Link to="categories">
        <img
          className="home-logo"
          src="https://trip-production.s3.amazonaws.com/06f2fce5ae884c34b74075832197cfd1.png"
          alt=""
        />
      </Link>
    </div>,
    <div className="play-now">
      <Link to="/categories" className="play-now-header">
        Play Now
      </Link>
    </div>,
  ];

  return (
    <div className="home-page-container">{user ? authenticatedItems : unauthenticatedItems}</div>
  );
};
export default Home;

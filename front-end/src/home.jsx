import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="HomePage">
      <div className="HomePageContainer">
        <div className="Search">
          <input type="text" placeholder="E"/>
        </div>
      </div>
    </div>
  );
};

export default Home;

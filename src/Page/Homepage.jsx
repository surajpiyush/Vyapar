import React from "react";
import Home from "../Component/Layourt/Home/Home";
import Stockinventory from "../Component/Stockinventory/Stockinventory";

const Homepage = () => {
  return (
    <div className="home-layout">
      <div className="app-home-section">
      
        <Home />
      </div>
      <div className="app-right-sidebar">
        <Stockinventory />
      </div>
    </div>
  );
};

export default Homepage;

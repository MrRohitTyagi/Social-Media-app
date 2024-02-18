import React from "react";
import "./LoaderStyles.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

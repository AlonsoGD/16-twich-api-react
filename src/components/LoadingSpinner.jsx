import React from "react";
import "./LoadingSpinner.css";

const LoadingSpiner = () => {
  return (
    <div className="lds-dual-ring">
      <span className="loadtext mb_hide">Loading...</span>
    </div>
  );
};

export default LoadingSpiner;

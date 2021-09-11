import React from "react";
import "./FirebaseLoader.scss";
import IoSpinner from "./IoSpinner/IoSpinner";

const FirebaseLoader = (props) => (
  <div className="FirebaseLoaderWrapper">
    <IoSpinner />
    <span>Loading...</span>
  </div>
);

export default FirebaseLoader;

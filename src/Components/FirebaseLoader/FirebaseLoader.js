import React from "react";
import PropTypes from "prop-types";
import "./FirebaseLoader.scss";
import IoSpinner from "./IoSpinner/IoSpinner";

const FirebaseLoader = (props) => (
  <div className="FirebaseLoaderWrapper">
    <IoSpinner />
    <span>Loading...</span>
  </div>
);

FirebaseLoader.propTypes = {};

FirebaseLoader.defaultProps = {};

export default FirebaseLoader;

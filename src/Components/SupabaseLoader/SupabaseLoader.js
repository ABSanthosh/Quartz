import React from "react";
import "./SupabaseLoader.scss";
import IoSpinner from "./IoSpinner/IoSpinner";

const SupabaseLoader = (props) => (
  <div className="SupabaseLoaderWrapper">
    <IoSpinner />
    <span>Loading...</span>
  </div>
);

export default SupabaseLoader;

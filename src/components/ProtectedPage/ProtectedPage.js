import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth } from "../../firebase/githubAuth";
import PropTypes from "prop-types";

export default function ProtectedPage({ children }) {
  let history = useHistory();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/lists");
      }
    });
  });
  return <>{children}</>;
}

ProtectedPage.propTypes = {
  children: PropTypes.node,
};

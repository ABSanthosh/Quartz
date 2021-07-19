import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./context";
import gitHubAuth from "../service/auth";
import { githubProvider } from "../config/authMethods";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  async function login() {
    try {
      const response = await gitHubAuth(githubProvider);
      setUser(response);
      setStatus("ready");
      console.log(response);
      return {
        status: "success",
      };
    } catch (err) {
      return {
        status: "fail",
        message: err || "Error in login",
      };
    }
  }

  const authObject = { user, status, login };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}

AuthProvider.defaultProps = {
  children: null,
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

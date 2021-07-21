import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./context";
import {
  getAuth,
  gitHubAuthSignin,
  gitHubAuthLink,
} from "../firebase/githubAuth";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
      }
    });
  });

  async function logout() {
    getAuth().signOut();
    setUserState(getAuth().currentUser);
  }

  async function login() {
    if (!getAuth().currentUser) {
      await gitHubAuthSignin(setUserState);
    } else {
      await gitHubAuthLink(setUserState);
    }
  }

  const authObject = { userState, login, logout };

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

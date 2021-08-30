import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./context";
import {
  getAuth,
  gitHubAuthSignin,
  gitHubAuthLink,
} from "../firebase/githubAuth";
import md5 from "../Utils/md5";

export function AuthProvider({ children }) {
  const initialBlock = { id: md5(), html: "", tagName: "div" };

  const [userState, setUserState] = useState(null);
  const [status, setStatus] = useState("loading");
  const [pageDetails, setPageDetails] = useState([initialBlock]);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
        setStatus("ready");
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

  const authObject = {
    userState,
    pageDetails,
    setPageDetails,
    login,
    logout,
    status,
  };

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

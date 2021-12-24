import { useEffect, useState } from "react";
import {
  getAuth,
  gitHubAuthSignIn,
  gitHubAuthLink,
} from "../firebase/githubAuth";
import PropTypes from "prop-types";
import { useFirebaseLoading } from "../hooks/useFirebaseLoading";
import { AuthContext } from "./context";
import { useStoreActions } from "easy-peasy";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState(null);
  const [status, setStatus] = useState("loading");

  const { stopFBLoading } = useFirebaseLoading();
  const storeActions = useStoreActions((action) => action);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
        setStatus("ready");
        storeActions.setUserState(user);
      } else {
        stopFBLoading();
      }
    });
  }, [storeActions, stopFBLoading]);

  async function logout() {
    getAuth().signOut();
    setUserState(getAuth().currentUser);
  }

  async function login() {
    if (!getAuth().currentUser) {
      await gitHubAuthSignIn(setUserState);
    } else {
      await gitHubAuthLink(setUserState);
    }
  }

  const authObject = {
    login,
    logout,
    userState,
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

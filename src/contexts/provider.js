import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./context";
import {
  getAuth,
  gitHubAuthSignin,
  gitHubAuthLink,
} from "../firebase/githubAuth";
import md5 from "../Utils/md5";
import firebase from "firebase";
import { useFirebaseLoading } from "../hooks/useFirebaseLoading";
export function AuthProvider({ children }) {
  const initialBoards = [
    {
      boardId: md5(),
      boardTitle: "",
      blocks: [{ id: md5(), html: "", tagName: "div" }],
    },
  ];

  const [userState, setUserState] = useState(null);
  const [allBoardDetails, setAllBoardDetails] = useState(initialBoards);
  const [status, setStatus] = useState("loading");
  const [currentBoard, setCurrentBoard] = useState(initialBoards[0]);
  const [pageDetails, setPageDetails] = useState(
    currentBoard.blocks || initialBoards[0].blocks
  );

  const { startFBLoading, stopFBLoading } = useFirebaseLoading();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
        setStatus("ready");
      } else {
        stopFBLoading();
      }
    });
  });

  useEffect(() => {
    startFBLoading();
    if (userState) {
      var db = firebase.database().ref(`/${userState.uid}`);
      db.once("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAllBoardDetails(data);
          setCurrentBoard(data[0]);
          stopFBLoading();
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  useEffect(() => {
    if (!allBoardDetails.includes(currentBoard)) {
      setCurrentBoard(allBoardDetails[0]);
    }
  }, [allBoardDetails, currentBoard]);

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
    login,
    status,
    logout,
    userState,
    pageDetails,
    currentBoard,
    setPageDetails,
    allBoardDetails,
    setCurrentBoard,
    setAllBoardDetails,
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

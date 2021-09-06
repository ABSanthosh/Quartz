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
  // const initialBlock = { id: md5(), html: "", tagName: "div" };
  // const initialBoard = {
  //   boardId: md5(),
  //   boardTitle: "",
  //   blocks: [{ id: md5(), html: "", tagName: "div" }],
  // };
  const initialBoards = [
    {
      boardId: md5(),
      boardTitle: "Board 1",
      blocks: [{ id: md5(), html: "This is board 1", tagName: "div" }],
    },
    {
      boardId: md5(),
      boardTitle: "Board 2",
      blocks: [{ id: md5(), html: "This is board 2", tagName: "div" }],
    },
    {
      boardId: md5(),
      boardTitle: "Board 3",
      blocks: [{ id: md5(), html: "This is board 3", tagName: "div" }],
    },
    {
      boardId: md5(),
      boardTitle: "Board 4",
      blocks: [{ id: md5(), html: "This is board 4", tagName: "div" }],
    },
  ];
  const [userState, setUserState] = useState(null);
  const [status, setStatus] = useState("loading");
  const [allBoardDetails, setAllBoardDetails] = useState(initialBoards);
  const [currentBoard, setCurrentBoard] = useState(initialBoards[0]);
  const [pageDetails, setPageDetails] = useState(currentBoard.blocks);

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

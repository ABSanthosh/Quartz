import "./Boards.scss";
import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import md5 from "../../Utils/md5";
import { getAuth } from "../../firebase/githubAuth";
import "../../Components/FancyButton/FancyButton.scss";
import NamePlate from "./Components/NamePlate/NamePlate";
import BoardHeader from "./Components/BoardHeader/BoardHeader";
import PageContent from "./Components/PageContent/PageContent";
import EditableBlock from "./Components/EditableBlock/EditableBlock";
import FancyButton from "../../Components/FancyButton/FancyButton";
import BoardSelecter from "./Components/BoardSelecter/BoardSelecter";
import firebase from "firebase";

function Boards() {
  let history = useHistory();
  let firebaseSyncTimer = useRef();
  const {
    pageDetails,
    logout,
    currentBoard,
    allBoardDetails,
    userState,
    setCurrentBoard,
    setPageDetails,
    setAllBoardDetails,
  } = useAuth();

  const defaultNavState = useMediaQuery({
    query: "(max-width: 980px)",
  });

  const SyncStatusSize = useMediaQuery({
    query: "(max-width: 380px)",
  });

  const [navState, setNavState] = useState(false);
  const [syncState, setSyncState] = useState(true);
  const [boardTitle, setBoardTitle] = useState(currentBoard.boardTitle);

  useEffect(() => {
    currentBoard.boardTitle = boardTitle;
  }, [boardTitle]);

  useEffect(() => {
    const changedBoard = allBoardDetails.at(-1);
    setCurrentBoard(changedBoard);
    setPageDetails(changedBoard.blocks);
    console.log("all", changedBoard);
  }, [allBoardDetails.length]);

  useEffect(() => {
    window.clearTimeout(firebaseSyncTimer.current);
    firebaseSyncTimer.current = window.setTimeout(() => {
      window.clearTimeout(firebaseSyncTimer.current);
      setSyncState(false);
      if (userState) {
        firebase
          .database()
          .ref(userState.uid)
          .set(allBoardDetails)
          .then(() => {
            setSyncState(true);
          });
      }
    }, 4000);
    setCurrentBoard(currentBoard);
  }, [
    setCurrentBoard,
    allBoardDetails,
    userState,
    currentBoard,
    currentBoard.boardTitle,
    pageDetails,
  ]);

  useEffect(() => {
    setBoardTitle(currentBoard.boardTitle);
  }, [currentBoard.boardId]);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user === null) {
        history.push("/");
      }
    });
  });

  useEffect(() => {
    setNavState(!defaultNavState);
    document.getElementById("NavBarInput").checked = !defaultNavState;
  }, [defaultNavState]);

  // TODO: focus to next line on enter
  // TODO: Manual sync button in sub header
  // TODO: Delete board option in borad selecter
  // TODO - Done: Default board on loading
  return (
    <div className="BoardsWrapper">
      <BoardHeader />
      {/* <pre
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "auto",
          zIndex: "1000",
          padding: "20px",
          maxWidth: "500px",
          borderRadius: "5px",
          backgroundColor: "#cfcfff",
        }}
      >
        {JSON.stringify(allBoardDetails, null, 2)}
      </pre> */}
      <nav
        className={`BoardsWrapper__sideBar ${
          navState ? "BoardsWrapper__sideBar--open" : ""
        }`}
      >
        <div className="BoardsWrapper__sideBar--top">
          <NamePlate />
          <div className="BoardsWrapper__sideBar--top__boards">
            {allBoardDetails.map((board, key) => (
              <BoardSelecter
                boardDetails={board}
                setCurrentBoard={setCurrentBoard}
                allBoardDetails={allBoardDetails}
                setAllBoardDetails={setAllBoardDetails}
                key={key}
                setSyncState={setSyncState}
              />
            ))}
          </div>
        </div>
        <div className="BoardsWrapper__sideBar--bottom">
          <FancyButton
            style={{ width: "80%" }}
            onClick={() => {
              const newBoard = {
                boardId: md5(),
                boardTitle: "",
                blocks: [{ id: md5(), html: "", tagName: "div" }],
              };
              const boardsList = [...allBoardDetails, newBoard];
              setAllBoardDetails(boardsList);

              setSyncState(false);
              if (userState) {
                firebase
                  .database()
                  .ref(userState.uid)
                  .set(allBoardDetails)
                  .then(() => {
                    setSyncState(true);
                  });
              }
            }}
            text="New Board"
          />

          <div
            style={{ width: "80%" }}
            className="FancyButtonWrapper"
            onClick={async () => {
              await logout();
            }}
          >
            Sign Out
          </div>
        </div>
      </nav>
      <div
        className={`BoardsWrapper__frame ${
          navState ? "BoardsWrapper__frame--open" : ""
        }`}
      >
        <div className="BoardsWrapper__subHeader">
          <div className="BoardsWrapper__subHeader--left">
            <div
              className={`BoardsWrapper__subHeader--hamburger ${
                navState && !defaultNavState
                  ? "BoardsWrapper__subHeader--hamburger--open"
                  : ""
              }
            ${
              navState && defaultNavState
                ? "BoardsWrapper__subHeader--hamburger--mobileOpen"
                : ""
            }`}
            >
              <input
                type="checkbox"
                id="NavBarInput"
                onChange={() => {
                  setNavState(!navState);
                }}
              />
              <div className="hamButton">
                <label className="HamMenu" htmlFor="NavBarInput">
                  <span className="span HL1" />
                  <span className="span HL2" />
                  <span className="span HL3" />
                </label>
              </div>
            </div>
            <EditableBlock
              html={boardTitle.replaceAll("<div><br></div>", "&nbsp")}
              onChange={(e) => {
                setBoardTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (!e) {
                  e = window.event;
                }
                var keyCode = e.which || e.keyCode;
                if (keyCode === 13 && !e.shiftKey) {
                  if (e.preventDefault) {
                    e.preventDefault();
                  } else {
                    e.returnValue = false;
                  }
                }
              }}
              placeholder="Untitled"
              tagName="p"
              className={`BoardsWrapper__subHeader--title ${
                navState && !defaultNavState
                  ? "BoardsWrapper__subHeader--title--open"
                  : ""
              }`}
            />
          </div>
          <div className="BoardsWrapper__subHeader--right">
            <div
              className="BoardsWrapper__subHeader__sync"
              onClick={() => {
                setSyncState(false);
                if (userState) {
                  firebase
                    .database()
                    .ref(userState.uid)
                    .set(allBoardDetails)
                    .then(() => {
                      setSyncState(true);
                    });
                }
              }}
            >
              {!syncState ? (
                <>
                  <svg viewBox="0 0 30 30" className="syncIcon">
                    <path d="M3,3 L5,3 L5,6.701 C7.384,3.83 10.977,2 15,2 C22.18,2 28,7.82 28,15 C28,22.18 22.18,28 15,28 C7.82,28 2,22.18 2,15 L4,15 C4,21.075 8.925,26 15,26 C21.075,26 26,21.075 26,15 C26,8.925 21.075,4 15,4 C11.142,4 7.76,5.994 5.798,9 L11,9 L11,11 L3,11 L3,3 Z"></path>
                  </svg>
                  {!SyncStatusSize ? "Syncing" : ""}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 14 14" className="check">
                    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
                  </svg>
                  {!SyncStatusSize ? "Synced" : ""}
                </>
              )}
              {/* Sync */}
            </div>
          </div>
        </div>
        <div className="BoardsWrapper__contentContainer">
          <EditableBlock
            className="BoardsWrapper__contentContainer--title"
            html={boardTitle}
            onKeyDown={(e) => {
              if (!e) {
                e = window.event;
              }
              var keyCode = e.which || e.keyCode;
              if (keyCode === 13 && !e.shiftKey) {
                if (e.preventDefault) {
                  e.preventDefault();
                } else {
                  e.returnValue = false;
                }
                document.execCommand("insertLineBreak");
              }
            }}
            onChange={(e) => {
              setBoardTitle(e.target.value);
              currentBoard.boardTitle = e.target.value
                .replaceAll("&nbsp;", " ")
                .replaceAll("<div><br></div>", " ")
                .replaceAll("<br>", " ");
            }}
            placeholder="Untitled"
            tagName="h1"
          />
          <PageContent navState={navState} />
        </div>
      </div>
    </div>
  );
}

Boards.propTypes = {};

Boards.defaultProps = {};

export default Boards;

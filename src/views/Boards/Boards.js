import "./Boards.scss";
import React, { useEffect, useState } from "react";
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

function Boards() {
  let history = useHistory();
  const {
    pageDetails,
    logout,
    currentBoard,
    allBoardDetails,
    setCurrentBoard,
    setAllBoardDetails,
  } = useAuth();

  const defaultNavState = useMediaQuery({
    query: "(max-width: 980px)",
  });

  const [navState, setNavState] = useState(false);
  const [boardTitle, setBoardTitle] = useState(currentBoard.boardTitle);

  // useEffect(() => {
  //   console.log(currentBoard, boardTitle);
  //   if (boardTitle !== currentBoard.boardTitle) {
  //     setBoardTitle(currentBoard.boardTitle);
  //   }
  // });
  useEffect(() => {
    // console.log(
    //   currentBoard,
    //   boardTitle,
    //   currentBoard.boardTitle === boardTitle
    // );
    currentBoard.boardTitle = boardTitle;
  }, [boardTitle]);

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
    // Stupid netlify! Remove this when deploying to production
    // setBoardTitle("Getting Started");

    setNavState(!defaultNavState);
    document.getElementById("NavBarInput").checked = !defaultNavState;
  }, [defaultNavState]);

  return (
    <div className="BoardsWrapper">
      <BoardHeader />
      <pre
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
        {/* {JSON.stringify(boardTitle, null, 2)}
        {JSON.stringify(pageDetails, null, 2)} */}
      </pre>
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
                // board={board}
                // title={board.boardTitle === "" ? "Untitled" : board.boardTitle}
                key={key}
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
            html={boardTitle.replace("<div><br></div>", "&nbsp")}
            onChange={(e) => {
              setBoardTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Pause") {
                console.log(e.key);
              }
              if (!e) {
                e = window.event;
              }
              var keyCode = e.which || e.keyCode;
              if (keyCode === 13 && !e.shiftKey) {
                console.log("Just enter");
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
        <div className="BoardsWrapper__contentContainer">
          <EditableBlock
            className="BoardsWrapper__contentContainer--title"
            html={boardTitle}
            onKeyDown={(e) => {
              if (!e) {
                console.log(e.key);
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

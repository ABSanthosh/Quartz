import "./Boards.scss";
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getAuth } from "../../firebase/githubAuth";
import "../../Components/FancyButton/FancyButton.scss";
import NamePlate from "./Components/NamePlate/NamePlate";
import BoardHeader from "./Components/BoardHeader/BoardHeader";
import PageContent from "./Components/PageContent/PageContent";
import EditableBlock from "./Components/EditableBlock/EditableBlock";

function Boards() {
  let history = useHistory();
  const { logout } = useAuth();

  const defaultNavState = useMediaQuery({
    query: "(max-width: 980px)",
  });

  const [navState, setNavState] = useState(false);
  const [boardTitle, setBoardTitle] = useState("Getting Started");

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user === null) {
        history.push("/");
      }
    });
  });

  useEffect(() => {
    // Stupid netlify! Remove this when deploying to production
    setBoardTitle("Getting Started");

    setNavState(!defaultNavState);
    document.getElementById("NavBarInput").checked = !defaultNavState;
  }, [defaultNavState]);

  return (
    <div className="BoardsWrapper">
      <BoardHeader />
      <nav
        className={`BoardsWrapper__sideBar ${
          navState ? "BoardsWrapper__sideBar--open" : ""
        }`}
      >
        <div className="BoardsWrapper__sideBar--top">
          <NamePlate />
        </div>
        <div className="BoardsWrapper__sideBar--bottom">
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
            html={boardTitle}
            onChange={(e) => {
              setBoardTitle(e.target.value);
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
            onChange={(e) => {
              setBoardTitle(e.target.value);
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

import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import { useAuth } from "../../hooks/useAuth";
import { useMediaQuery } from "react-responsive";

import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import NamePlate from "./Components/NamePlate/NamePlate";
import SideBarItem from "./Components/SideBarItem/SideBarItem";

import { ReactComponent as DashboardIcon } from "../../Assets/Img/dashboard.svg";
import { ReactComponent as StickyNotes } from "../../Assets/Img/notes.svg";

import { useStoreState, useStoreActions } from "easy-peasy";
// import supabase from "../../supabase/supabase-config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NotesContainer from "../Containers/NotesContainer/NotesContainer";
import BoardsContainer from "../Containers/BoardsContainer/BoardsContainer";

function Dashboard() {
  // Global States and functions
  const { logout, session } = useAuth();
  const [navState, setNavState] = useState(false);
  let history = useHistory();
  const sideBarRef = useRef();
  const defaultNavState = useMediaQuery({
    query: "(max-width: 1064px)",
  });

  // Boards related
  const boardCount = useStoreState((state) => state.boardCount);
  // const setNotes = useStoreActions((actions) => actions.setNotes);
  // Notes related

  const currentOption = useStoreState((state) => state.currentOption);

  const noteCount = useStoreState((state) => state.noteCount);
  const notes = useStoreState((state) => state.notes);
  const setCurrentOption = useStoreActions(
    (actions) => actions.setCurrentOption
  );

  const fetchNotes = async () => {
    // await supabase
    //   .from("notes")
    //   .select()
    //   .then((res) => {
    //     if (JSON.stringify(res.data) !== JSON.stringify(notes)) {
    //       setNotes(res.data);
    //     }
    //     // console.log(res.data);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
  };

  useEffect(() => {});

  useEffect(() => {
    // if (notes.length === 0) {
    fetchNotes();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (notes.some((element) => element.isChanged === true)) {
    window.onbeforeunload = () => {
      return "Some notes have not been saved. Are you sure you want to leave?";
    };
  } else {
    window.onbeforeunload = null;
  }

  function handleClick({ target }) {
    if (
      (!sideBarRef.current.contains(target) ||
        !sideBarRef.current === target) &&
      defaultNavState
    ) {
      setNavState(false);
      if (document.getElementById("NavBarInput").checked) {
        document.getElementById("NavBarInput").checked = false;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div className="DashboardWrapper">
      <DashboardHeader />
      <nav
        ref={sideBarRef}
        className={`DashboardWrapper__sideBar ${
          navState ? "DashboardWrapper__sideBar--open" : ""
        }`}
      >
        <div className="DashboardWrapper__sideBar--top">
          <div className="DashboardWrapper__sideBar--top__burgerMenu">
            <div
              className={`DashboardWrapper__sideBar--hamburger ${
                navState && !defaultNavState
                  ? "DashboardWrapper__sideBar--hamburger--open"
                  : ""
              }
            ${
              navState && defaultNavState
                ? "DashboardWrapper__sideBar--hamburger--mobileOpen"
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
          </div>
          <NamePlate />
          <div className="DashboardWrapper__sideBar--top__boards">
            <SideBarItem
              text="Boards"
              onClick={() => {
                setCurrentOption("boards");
                history.push("/app/dashboard/boards");
              }}
              isActive={currentOption === "boards"}
              count={boardCount}
            >
              <DashboardIcon />
            </SideBarItem>
            <SideBarItem
              text="Notes"
              onClick={() => {
                setCurrentOption("notes");
                history.push("/app/dashboard/notes");
              }}
              isActive={currentOption === "notes"}
              count={noteCount}
            >
              <StickyNotes />
            </SideBarItem>
          </div>
        </div>
        <div className="DashboardWrapper__sideBar--bottom">
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
        className={`DashboardWrapper__frame ${
          navState ? "DashboardWrapper__frame--open" : ""
        }`}
      >
        <div className="DashboardWrapper__contentContainer">
          {currentOption === "boards" && (
            <BoardsContainer navState={navState} />
          )}
          {currentOption === "notes" && <NotesContainer navState={navState} />}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  // bla: PropTypes.string,
};

Dashboard.defaultProps = {
  // bla: 'test',
};

export default Dashboard;

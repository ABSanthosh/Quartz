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
import supabase from "../../supabase/supabase-config";
import { ControlIconsDefinitions } from "../../Assets/Font/IconMap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NotesContainer from "../Containers/NotesContainer/NotesContainer";
import BoardsContainer from "../Containers/BoardsContainer/BoardsContainer";

function Dashboard() {
  // Hooks
  const { logout, session } = useAuth();
  const [navState, setNavState] = useState(false);
  const [isSyncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");
  let history = useHistory();

  // Store
  const currentOption = useStoreState((state) => state.currentOption);
  const setNotes = useStoreActions((actions) => actions.setNotes);
  const boardCount = useStoreState((state) => state.boardCount);
  const noteCount = useStoreState((state) => state.noteCount);
  const notes = useStoreState((state) => state.notes);
  const setCurrentOption = useStoreActions(
    (actions) => actions.setCurrentOption
  );

  const sideBarRef = useRef();

  // Media queries
  const defaultNavState = useMediaQuery({
    query: "(max-width: 1064px)",
  });

  const SyncStatusSize = useMediaQuery({
    query: "(max-width: 380px)",
  });

  // TODO: Multiple loads occurring on page load
  // console.log("Fref")

  const fetchNotes = async () => {
    await supabase
      .from("notes")
      .select()
      .then((res) => {
        if (JSON.stringify(res.data) !== JSON.stringify(notes)) {
          setNotes(res.data);
        }
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const updateNotes = async () => {
    setSyncing(true);
    notes.map(async (note) => {
      if (note.isChanged) {
        note.isChanged = false;
        await supabase
          .from("notes")
          .upsert(note)
          .match({ id: note.id })
          .then((res) => {
            // console.log(res);
            setSyncing(false);
            setSyncError("");
          })
          .catch((err) => {
            // console.log(err);
            setSyncError(err.message);
            setSyncing(false);
          });
      } else {
        setSyncing(false);
        setSyncError("");
      }
    });

    setNotes(
      notes.map((note) => {
        note.isChanged = false;
        return note;
      })
    );
  };

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
        <div className="DashboardWrapper__subHeader">
          <div className="DashboardWrapper__subHeader--left">
            <div
              className={`DashboardWrapper__subHeader--hamburger ${
                navState && !defaultNavState
                  ? "DashboardWrapper__subHeader--hamburger--open"
                  : ""
              }
            ${
              navState && defaultNavState
                ? "DashboardWrapper__subHeader--hamburger--mobileOpen"
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
            <p>
              {currentOption.charAt(0).toUpperCase() + currentOption.slice(1)}
            </p>
          </div>
          <div className="DashboardWrapper__subHeader--right">
            {currentOption === "notes" && (
              <>
                {notes.some((element) => element.isChanged === true) ? (
                  <span
                    className="DashboardWrapper__subHeader__sync--warning"
                    onClick={async () => {
                      updateNotes();
                    }}
                  >
                    <span className="controlIcons">
                      {ControlIconsDefinitions.Warning}
                    </span>
                    Changes detected, Sync now!
                  </span>
                ) : (
                  <div className="DashboardWrapper__subHeader__sync">
                    {syncError === "" && (
                      <>
                        {isSyncing ? (
                          <>
                            <svg viewBox="0 0 30 30" className="syncIcon">
                              <path d="M3,3 L5,3 L5,6.701 C7.384,3.83 10.977,2 15,2 C22.18,2 28,7.82 28,15 C28,22.18 22.18,28 15,28 C7.82,28 2,22.18 2,15 L4,15 C4,21.075 8.925,26 15,26 C21.075,26 26,21.075 26,15 C26,8.925 21.075,4 15,4 C11.142,4 7.76,5.994 5.798,9 L11,9 L11,11 L3,11 L3,3 Z"></path>
                            </svg>
                            {!SyncStatusSize ? "Syncing" : ""}
                          </>
                        ) : (
                          <>
                            <span className="controlIcons">
                              {ControlIconsDefinitions.CheckMark}
                            </span>
                            {!SyncStatusSize ? "Synced" : ""}
                          </>
                        )}
                      </>
                    )}
                    {syncError !== "" && (
                      <>
                        <span className="controlIcons">
                          {ControlIconsDefinitions.Error}
                        </span>
                        Error
                      </>
                    )}
                  </div>
                )}

                {/* <div
                  className="DashboardWrapper__subHeader__sync"
                  onClick={() => {
                    fetchNotes();
                  }}
                >
                  <span className="controlIcons" style={{ fontSize: "16px" }}>
                    {ControlIconsDefinitions.Download}
                  </span>
                  Fetch Notes
                </div> */}
              </>
            )}
          </div>
        </div>
        <div className="DashboardWrapper__contentContainer">
          {currentOption === "boards" && <BoardsContainer />}
          {currentOption === "notes" && <NotesContainer />}
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

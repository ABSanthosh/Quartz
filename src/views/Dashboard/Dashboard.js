import React, { useState } from "react";
// import PropTypes from 'prop-types';
import "./Dashboard.scss";
import { useAuth } from "../../hooks/useAuth";
import { useMediaQuery } from "react-responsive";

import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import NamePlate from "./Components/NamePlate/NamePlate";
import SideBarItem from "./Components/SideBarItem/SideBarItem";

import { ReactComponent as DashboardIcon } from "../../Assets/Img/dashboard.svg";
import { ReactComponent as StickyNotes } from "../../Assets/Img/notes.svg";

import { useStoreState, useStoreActions } from "easy-peasy";
import BoardsContainer from "./Components/BoardsContainer/BoardsContainer";
import NotesContainer from "./Components/NotesContainer/NotesContainer";
import supabase from "../../supabase/supabase-config";
import { ControlIconsDefinitions } from "../../Assets/Font/IconMap";

function Dashboard(props) {
  // Hooks
  const { logout } = useAuth();
  const [navState, setNavState] = useState(false);
  const [isSyncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");

  // Store
  const currentOption = useStoreState((state) => state.currentOption);
  const setCurrentOption = useStoreActions(
    (actions) => actions.setCurrentOption
  );
  const setNotes = useStoreActions((actions) => actions.setNotes);

  const noteCount = useStoreState((state) => state.noteCount);

  const boardCount = useStoreState((state) => state.boardCount);
  const notes = useStoreState((state) => state.notes);

  // Media queries
  const defaultNavState = useMediaQuery({
    query: "(max-width: 980px)",
  });

  const SyncStatusSize = useMediaQuery({
    query: "(max-width: 380px)",
  });

  const fetchNotes = async () => {
    await supabase
      .from("notes")
      .select()
      .then((res) => {
        // console.log(res);
        setNotes(res.data);
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
  };

  return (
    <div className="DashboardWrapper">
      <DashboardHeader />
      <nav
        className={`DashboardWrapper__sideBar ${
          navState ? "DashboardWrapper__sideBar--open" : ""
        }`}
      >
        <div className="DashboardWrapper__sideBar--top">
          <NamePlate />
          <div className="DashboardWrapper__sideBar--top__boards">
            <SideBarItem
              text="Boards"
              onClick={() => setCurrentOption("Boards")}
              isActive={currentOption === "Boards"}
              count={boardCount}
            >
              <DashboardIcon />
            </SideBarItem>
            <SideBarItem
              text="Notes"
              onClick={() => setCurrentOption("Notes")}
              isActive={currentOption === "Notes"}
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
            <p>{currentOption}</p>
          </div>
          <div className="DashboardWrapper__subHeader--right">
            <div
              className="DashboardWrapper__subHeader__sync"
              onClick={async () => {
                updateNotes();
              }}
            >
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
            <span
              className="DashboardWrapper__subHeader__sync"
              onClick={async () => {
                fetchNotes();
              }}
            >
              Fetch Notes
            </span>
          </div>
        </div>
        <div className="DashboardWrapper__contentContainer">
          {currentOption === "Boards" && <BoardsContainer />}
          {currentOption === "Notes" && <NotesContainer />}
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

import React, { useEffect, useState } from "react";
import "./NotesContainer.scss";
import { useMediaQuery } from "react-responsive";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ReactComponent as DropdownIcon } from "../../../Assets/Img/dropdownIcon.svg";
import StickyNote from "./Components/StickyNote/StickyNote";
import ContextMenu from "./Components/ContextMenu/ContextMenu";
import { ReactComponent as Sad } from "../../../Assets/Img/sad.svg";
import { ReactComponent as Plus } from "../../../Assets/Img/plus.svg";

import SearchBar from "../../../Components/SearchBar/SearchBar";
import Fuse from "fuse.js";
import NotesListItem from "./Components/NotesListItem/NotesListItem";
import { ControlIconsDefinitions } from "../../../Assets/Font/IconMap";
import { sortByLastModified } from "../../../Utils/sortByLastModified";
import supabase from "../../../supabase/supabase-config";
import { useHistory } from "react-router-dom";
import ContentEditable from "react-contenteditable";

function NotesContainer({ navState }) {
  const notes = useStoreState((state) => state.notes);
  const selectedNote = useStoreState((state) => state.selectedNote);
  const setSelectedNote = useStoreActions((action) => action.setSelectedNote);
  const addNote = useStoreActions((actions) => actions.addNote);

  const [isSideContext, setIsSideContext] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [contextData, setContextData] = useState({});
  const [notesDropdownState, setNotesDropdownState] = useState(false);
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  let history = useHistory();
  const fuse = new Fuse(notes, {
    keys: ["sanitizedContent"],
  });

  const dropdown = useMediaQuery({
    query: "(max-width: 840px)",
  });

  const subHeaderTextTransform = useMediaQuery({
    query: "(max-width: 1065px)",
  });

  const contextMenuPositionState = useMediaQuery({
    query: "(max-width: 840px)",
  });

  const SyncStatusSize = useMediaQuery({
    query: "(max-width: 380px)",
  });
  const setNotes = useStoreActions((actions) => actions.setNotes);
  const setSelectedNoteTitle = useStoreActions(
    (actions) => actions.setSelectedNoteTitle
  );
  const [isSyncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    if (dropdown) {
      if (
        document
          .querySelector(".NotesContainerWrapper__left")
          .classList.contains("NotesContainerWrapper__left--open")
      ) {
        document.querySelector("#dropdownCheckbox").click();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote]);

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

  return (
    <>
      <div className="DashboardWrapper__subHeader">
        <div
          className={`DashboardWrapper__subHeader--left ${
            navState && !subHeaderTextTransform
              ? "DashboardWrapper__subHeader--left--open"
              : ""
          }`}
        >
          <p>Notes</p>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "bolder",
              margin: "0 4px 0 6px",
            }}
            className="controlIcons"
          >
            {ControlIconsDefinitions.ChevronRight}
          </span>
          <ContentEditable
            className={`DashboardWrapper__subHeader--left--title ${
              isEllipsisable
                ? "DashboardWrapper__subHeader--left--ellipsis"
                : ""
            }`}
            html={selectedNote.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
              if (
                e.target.innerText.length >= 40 &&
                e.key !== "Backspace" &&
                e.key !== "Delete"
              ) {
                e.preventDefault();
              }
            }}
            onBlur={(e) => {
              e.target.scrollTo(0, 0);
              setIsEllipsisable(true);
            }}
            onFocus={(e) => {
              e.target.scrollTo(e.target.scrollWidth, 0);
              setIsEllipsisable(false);
            }}
            onChange={(e) => {
              setSelectedNoteTitle({
                id: selectedNote.id,
                title: e.target.value,
              });
            }}
            spellCheck="false"
          />
          {isEllipsisable && (
            <span
              style={{ fontSize: "15px", color: "#a5a5a5" }}
              className="controlIcons"
            >
              {ControlIconsDefinitions.Edit}
            </span>
          )}
        </div>
        <div className="DashboardWrapper__subHeader--right">
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
        </div>
      </div>
      {dropdown && (
        <button
          onClick={() => {
            setNotesDropdownState(!notesDropdownState);
          }}
          className="NotesContainerWrapper__dropdown"
        >
          <input type="checkbox" id="dropdownCheckbox" />
          <p>Notes List</p>
          <DropdownIcon />
        </button>
      )}
      <ContextMenu
        className="NotesContainerWrapper--contextMenu"
        isContext={isSideContext}
        setIsContext={setIsSideContext}
        data={contextData}
        direction={contextMenuPositionState ? "left" : "right"}
      />
      <div className="NotesContainerWrapper">
        <div
          className={`NotesContainerWrapper__left ${
            notesDropdownState
              ? "NotesContainerWrapper__left--open"
              : "NotesContainerWrapper__left--close"
          }`}
        >
          <SearchBar
            style={contextMenuPositionState ? { marginTop: "16px" } : {}}
            placeholder="Search all notes"
            callBack={(val) => {
              if (val !== "") {
                setSearchResults(
                  fuse.search(`=${val}`).map((item) => item.item)
                );
              } else {
                setSearchResults(null);
              }
            }}
          />
          <div className="NotesContainerWrapper__left__container">
            {!searchResults &&
              sortByLastModified(notes).map((note, index) => (
                <NotesListItem
                  contextMenuPositionState={contextMenuPositionState}
                  note={note}
                  key={index}
                  setSelectedNote={setSelectedNote}
                  setContextData={setContextData}
                  setIsSideContext={setIsSideContext}
                  index={index}
                  isSideContext={isSideContext}
                />
              ))}

            {searchResults &&
              searchResults.length > 0 &&
              searchResults.map((note, index) => (
                <NotesListItem
                  contextMenuPositionState={contextMenuPositionState}
                  note={note}
                  key={index}
                  onClick={() => {
                    setSearchResults(null);
                    document.querySelector(".SearchBarWrapper__input").value =
                      "";
                  }}
                  setSelectedNote={setSelectedNote}
                  setContextData={setContextData}
                  setIsSideContext={setIsSideContext}
                  index={index}
                  isSideContext={isSideContext}
                />
              ))}

            {searchResults && searchResults.length === 0 && (
              <div className="NotesContainerWrapper__listItem--NoItemsFound">
                <Sad />
                <p>No Notes found</p>
              </div>
            )}

            {notes.length === 0 && (
              <div
                className="NotesContainerWrapper__listItem--AddNote"
                onClick={() => {
                  if (selectedNote) {
                    if (selectedNote.content !== "") {
                      const newNoteId = new Date().getTime();
                      addNote(supabase.auth.user().id);
                      history.push(`/app/dashboard/notes/${newNoteId}`);
                    }
                  } else {
                    const newNoteId = new Date().getTime();
                    addNote({ uid: supabase.auth.user().id, id: newNoteId });
                    history.push(`/app/dashboard/notes/${newNoteId}`);
                  }
                }}
              >
                <Plus />
                <p>Add note</p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`NotesContainerWrapper__right ${
            notes.length > 0
              ? ""
              : "NotesContainerWrapper__right--centerContent"
          }`}
        >
          {notes.length > 0 ? (
            <StickyNote data={selectedNote} />
          ) : (
            <div
              className="NotesContainerWrapper__listItem--AddNote"
              style={{ width: "60%" }}
              onClick={() => {
                if (selectedNote) {
                  if (selectedNote.content !== "") {
                    const newNoteId = new Date().getTime();
                    addNote(supabase.auth.user().id);
                    history.push(`/app/dashboard/notes/${newNoteId}`);
                  }
                } else {
                  const newNoteId = new Date().getTime();
                  addNote({ uid: supabase.auth.user().id, id: newNoteId });
                  history.push(`/app/dashboard/notes/${newNoteId}`);
                }
              }}
            >
              <Plus />
              <p>Add note</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

NotesContainer.propTypes = {};

NotesContainer.defaultProps = {};

export default NotesContainer;

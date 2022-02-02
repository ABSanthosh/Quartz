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

function NotesContainer() {
  const notes = useStoreState((state) => state.notes);
  const selectedNote = useStoreState((state) => state.selectedNote);
  const setSelectedNote = useStoreActions((action) => action.setSelectedNote);
  const addNote = useStoreActions((actions) => actions.addNote);

  const [isSideContext, setIsSideContext] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [contextData, setContextData] = useState({});
  const [notesDropdownState, setNotesDropdownState] = useState(false);

  let history = useHistory();
  const fuse = new Fuse(notes, {
    keys: ["sanitizedContent"],
  });

  const dropdown = useMediaQuery({
    query: "(max-width: 840px)",
  });

  const contextMenuPositionState = useMediaQuery({
    query: "(max-width: 840px)",
  });

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

  return (
    <>
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
          {!dropdown ? (
            <>
              {notes.length > 0 ? (
                <StickyNote data={selectedNote} />
              ) : (
                <span className="NotesContainerWrapper__right--AddNew controlIcons">
                  {ControlIconsDefinitions.Add}
                  <p>Add a new note</p>
                </span>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

NotesContainer.propTypes = {};

NotesContainer.defaultProps = {};

export default NotesContainer;

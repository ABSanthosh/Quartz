import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import "./NotesContainer.scss";
import { useMediaQuery } from "react-responsive";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ReactComponent as DropdownIcon } from "../../../../Assets/Img/dropdownIcon.svg";
import StickyNote from "../StickyNote/StickyNote";

function NotesContainer() {
  const notes = useStoreState((state) => state.notes);
  const selectedNote = useStoreState((state) => state.selectedNote);
  const setSelectedNote = useStoreActions((action) => action.setSelectedNote);

  const [notesDropdownState, setNotesDropdownState] = useState(false);
  const dropdown = useMediaQuery({
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
      <div className="NotesContainerWrapper">
        <div
          className={`NotesContainerWrapper__left ${
            notesDropdownState
              ? "NotesContainerWrapper__left--open"
              : "NotesContainerWrapper__left--close"
          }`}
        >
          <div className="NotesContainerWrapper__left__container">
            {notes.map((note, index) => (
              <div
                className="NotesContainerWrapper__listItem"
                key={index}
                onClick={() => setSelectedNote(index)}
                style={{
                  backgroundColor: note.theme.primary,
                }}
              >
                <span
                  className="NotesContainerWrapper__listItem--header"
                  style={{ backgroundColor: note.theme.secondary }}
                />
                <div className="NotesContainerWrapper__listItem--time">
                  <span>{note.lastModified}</span>
                </div>
                <div className="NotesContainerWrapper__listItem--content">
                  {note.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="NotesContainerWrapper__right">
          <StickyNote data={selectedNote} />
        </div>
      </div>
    </>
  );
}

NotesContainer.propTypes = {
  // bla: PropTypes.string,
};

NotesContainer.defaultProps = {
  // bla: 'test',
};

export default NotesContainer;

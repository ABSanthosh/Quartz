import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import "./NotesContainer.scss";
import { useMediaQuery } from "react-responsive";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ReactComponent as DropdownIcon } from "../../../../Assets/Img/dropdownIcon.svg";
import StickyNote from "./Components/StickyNote/StickyNote";
import ContextMenu from "./Components/ContextMenu/ContextMenu";
import { ReactComponent as Dots } from "../../../../Assets/Img/StickyNotes/dots.svg";

function NotesContainer() {
  const notes = useStoreState((state) => state.notes);
  let selectedNote = useStoreState((state) => state.selectedNote);
  const setSelectedNote = useStoreActions((action) => action.setSelectedNote);

  const [isSideContext, setIsSideContext] = useState(false);
  const [contextData, setContextData] = useState({});
  const [notesDropdownState, setNotesDropdownState] = useState(false);

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
          <div className="NotesContainerWrapper__left__container">
            {notes.map((note, index) => (
              <div
                className="NotesContainerWrapper__listItem"
                data-long-press-delay="500"
                key={index}
                onClick={(e) => {
                  // console.log(e.target.className.baseVal);
                  if (!e.target.className.baseVal) {
                    setSelectedNote(note.id);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextData(note);
                  setIsSideContext(true);
                  var contextMenu = document.querySelector(
                    ".NotesContainerWrapper--contextMenu"
                  );
                  contextMenu.style.left = e.pageX + "px";
                  contextMenu.style.top = e.pageY - 29 + "px";
                }}
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
                  {contextMenuPositionState && (
                    <Dots
                      className={`NotesContainerWrapper__optionsButton${index}`}
                      onClick={() => {
                        setContextData(note);
                        setIsSideContext(!isSideContext);
                        const optionsButton = document.querySelector(
                          ".NotesContainerWrapper__optionsButton" + index
                        );
                        var position = optionsButton.getBoundingClientRect();
                        var positionX = position.x;
                        var positionY = position.y;

                        var contextMenu = document.querySelector(
                          ".NotesContainerWrapper--contextMenu"
                        );

                        contextMenu.style.left =
                          positionX -
                          (contextMenu.clientWidth -
                            optionsButton.clientWidth) +
                          "px";

                        contextMenu.style.top = positionY + 1 + "px";
                      }}
                    />
                  )}
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

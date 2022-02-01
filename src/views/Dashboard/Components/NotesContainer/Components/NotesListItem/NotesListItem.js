import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Dots } from "../../../../../../Assets/Img/StickyNotes/dots.svg";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

export default function NotesListItem({
  index,
  note,
  setSelectedNote,
  setContextData,
  setIsSideContext,
  isSideContext,
  onClick,
  contextMenuPositionState,
}) {
  let history = useHistory();


  return (
    <div
      className="NotesContainerWrapper__listItem"
      style={{
        borderTop: `6px solid ${note.theme.secondary}`,
        backgroundColor: note.theme.primary,
      }}
      key={index}
      onClick={(e) => {
        if (!e.target.className.baseVal) {
          setSelectedNote(note.id);
        }
        onClick();
        history.push(`/app/dashboard/notes/${note.id}`);
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
    >
      <div className="NotesContainerWrapper__listItem--time">
        <span>{note.lastModified.today + " " + note.lastModified.time}</span>
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
                (contextMenu.clientWidth - optionsButton.clientWidth) +
                "px";

              contextMenu.style.top = positionY + 1 + "px";
            }}
          />
        )}
      </div>
      <div
        className="NotesContainerWrapper__listItem--content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(note.content)
        }}
        disabled={true}
      />
    </div>
  );
}

NotesListItem.propTypes = {
  index: PropTypes.number.isRequired,
  note: PropTypes.object.isRequired,
  setSelectedNote: PropTypes.func.isRequired,
  setContextData: PropTypes.func.isRequired,

  setIsSideContext: PropTypes.func.isRequired,
  isSideContext: PropTypes.bool.isRequired,
  contextMenuPositionState: PropTypes.bool.isRequired,
};

NotesListItem.defaultProps = {
  onClick: () => {},
};

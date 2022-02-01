import { useStoreActions, useStoreState } from "easy-peasy";
import propTypes from "prop-types";
import React from "react";
import ContentEditable from "react-contenteditable";

function ContentEditor({ handleCursorElement }) {
  const data = useStoreState((state) => state.selectedNote);
  const setSelectedNoteContent = useStoreActions(
    (action) => action.setSelectedNoteContent
  );

  const saveUpdates = () => {
    setSelectedNoteContent({
      id: data.id,
      content: document.querySelector(
        ".StickyNoteWrapper__content--editableContent"
      ).innerHTML,
      sanitizedContent: document.querySelector(
        ".StickyNoteWrapper__content--editableContent"
      ).innerText,
    });
  };

  return (
    <div className="StickyNoteWrapper__content--editableContainer">
      <i
        style={{
          position: "absolute",
          color: "#999",
          visibility: data.content === "" ? "visible" : "hidden",
        }}
      >
        Type something...
      </i>
      <ContentEditable
        className="StickyNoteWrapper__content--editableContent"
        html={data.content}
        onChange={(e) => {
          saveUpdates();
        }}
        onClick={() => {
          if (
            window
              .getSelection()
              .anchorNode.textContent.substring(
                window.getSelection().extentOffset,
                window.getSelection().anchorOffset
              ).length === 0
          ) {
            handleCursorElement();
          }
        }}
        onKeyUp={() => {
          if (
            window
              .getSelection()
              .anchorNode.textContent.substring(
                window.getSelection().extentOffset,
                window.getSelection().anchorOffset
              ).length === 0
          ) {
            handleCursorElement();
            saveUpdates();
          }
        }}
      />
    </div>
  );
}

ContentEditor.propTypes = {
  handleCursorElement: propTypes.func.isRequired,
};

export default ContentEditor;

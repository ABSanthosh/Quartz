import { useStoreActions, useStoreState } from "easy-peasy";
import propTypes from "prop-types";
import React from "react";
import ContentEditable from "react-contenteditable";
import { useSupabaseLoading } from "../../../../../../hooks/useSupabaseLoading";
import pasteHtmlAtCaret from "../../../../../../Utils/pasteHtmlAtCaret";

function ContentEditor({ handleCursorElement }) {
  const data = useStoreState((state) => state.selectedNote);
  const setSelectedNoteContent = useStoreActions(
    (action) => action.setSelectedNoteContent
  );

  const updateSelectedNote = useStoreActions(
    (action) => action.updateSelectedNote
  );

  const { startFBLoading, stopFBLoading } = useSupabaseLoading();

  return (
    <div className="StickyNoteWrapper__content--editableContainer">
      {/* <div className="StickyNoteWrapper__content--imagePreview">
        {data.images.map((image, index) => {
          console.log(image);
          return (
            <img
              src={image}
              alt="uploadedImg"
              className="StickyNoteWrapper__content--editableContainer--image"
              key={index}
            />
          );
        })}
      </div> */}
      <ContentEditable
        className="StickyNoteWrapper__content--editableContent"
        html={data.content}
        onChange={(e) => {
          setSelectedNoteContent({
            id: data.id,
            content: document.querySelector(
              ".StickyNoteWrapper__content--editableContent"
            ).innerHTML,
            sanitizedContent: document.querySelector(
              ".StickyNoteWrapper__content--editableContent"
            ).innerText,
          });
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
            setSelectedNoteContent({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
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
            setSelectedNoteContent({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
          }
        }}
        onDrop={(e) => {
          startFBLoading();
          e.preventDefault();
          e.stopPropagation();

          if (e.dataTransfer.files.length > 0) {
            var reader = new FileReader();
            var baseString;
            reader.onloadend = function () {
              baseString = reader.result;

              var newImage = document.createElement("img");
              newImage.src = baseString;
              newImage.alt = "";

              pasteHtmlAtCaret(newImage.outerHTML);
            };
            reader.readAsDataURL(e.dataTransfer.files[0]);
            updateSelectedNote({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
          }
          stopFBLoading();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "copy";
        }}
        onPaste={(e) => {
          startFBLoading();
          e.preventDefault();

          try {
            var reader = new FileReader();
            var baseString;
            reader.onloadend = function () {
              baseString = reader.result;

              var newImage = document.createElement("img");
              newImage.src = baseString;
              newImage.alt = "";

              pasteHtmlAtCaret(newImage.outerHTML);
            };
            reader.readAsDataURL(e.dataTransfer.files[0]);
            updateSelectedNote({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
          } catch (err) {
            var pastedData = e.clipboardData.getData("text/html");
            var pastedImage = document.createElement("img");

            let src = pastedData.match(/src="(.*?)"/);

            if (src) {
              pastedImage.src = src[1];
              pastedImage.alt = "";

              pasteHtmlAtCaret(pastedImage.outerHTML);
            }else{
              pasteHtmlAtCaret(pastedData);
            }
            updateSelectedNote({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
          }
          stopFBLoading();
        }}
      />
    </div>
  );
}

ContentEditor.propTypes = {
  handleCursorElement: propTypes.func.isRequired,
};

export default ContentEditor;

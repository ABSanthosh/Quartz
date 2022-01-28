import { useStoreActions, useStoreState } from "easy-peasy";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useSupabaseLoading } from "../../../../../../hooks/useSupabaseLoading";
import pasteHtmlAtCaret from "../../../../../../Utils/pasteHtmlAtCaret";
import ImageContextMenu from "../ImageContextMenu/ImageContextMenu";

function ContentEditor({ handleCursorElement }) {
  const data = useStoreState((state) => state.selectedNote);
  const setSelectedNoteContent = useStoreActions(
    (action) => action.setSelectedNoteContent
  );
  const [imageContextMenu, setImageContextMenu] = useState();

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

  useEffect(() => {
    const editableContent = document.querySelector(
      ".StickyNoteWrapper__content--editableContent"
    );

    const images = editableContent.querySelectorAll("img");
    images.forEach((image) => {
      if (image.oncontextmenu === null) {
        image.oncontextmenu = (e) => {
          e.preventDefault();
          setImageContextMenu(
            <ImageContextMenu
              data={data}
              setSelectedNoteContent={setSelectedNoteContent}
              setImageContextMenu={setImageContextMenu}
              imageElement={image}
            />
          );
        };
      }
    });
  });

  const { startFBLoading, stopFBLoading } = useSupabaseLoading();

  return (
    <>
      {imageContextMenu}
      <div className="StickyNoteWrapper__content--editableContainer">
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
          onDrop={(e) => {
            startFBLoading();
            e.preventDefault();
            e.stopPropagation();

            if (e.dataTransfer.files.length > 0) {
              var reader = new FileReader();
              var baseString;
              reader.onloadend = function () {
                baseString = reader.result;

                var hiddenImage = new Image();
                hiddenImage.onload = () => {
                  document.execCommand(
                    "insertHTML",
                    false,
                    `<img src="${baseString}" alt="" default-height=${hiddenImage.height} default-width=${hiddenImage.width} >`
                  );
                  saveUpdates();
                };
                hiddenImage.src = baseString;
              };
              reader.readAsDataURL(e.dataTransfer.files[0]);
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

                var hiddenImage = new Image();
                hiddenImage.onload = () => {
                  document.execCommand(
                    "insertHTML",
                    false,
                    `<img src="${baseString}" alt="" default-height=${hiddenImage.height} default-width=${hiddenImage.width} >`
                  );
                  saveUpdates();
                };
                hiddenImage.src = baseString;
              };
              reader.readAsDataURL(e.dataTransfer.files[0]);
            } catch (err) {
              var pastedData = e.clipboardData.getData("text/html");
              var hiddenImage = new Image();

              console.log(pastedData);
              let width = "";
              let height = "";
              let defaultHeight = "";
              let defaultWidth = "";

              if (pastedData.includes("style=")) {
                height = pastedData
                  .match(/style="(.*?)"/)[1]
                  .match(/height:(.*?)px/)[1];

                width = pastedData
                  .match(/style="(.*?)"/)[1]
                  .split("; ")
                  .map((item) => {
                    if (item.includes("width:")) {
                      return item.match(/(?<!.)width:(.*)px/);
                    } else {
                      return null;
                    }
                  });
                width = width.filter(
                  (item) => item !== null && item !== undefined
                )[0][1];
              }

              if (
                pastedData.includes("default-height") &&
                pastedData.includes("default-width")
              ) {
                defaultHeight = pastedData.match(/default-height="(.*?)"/)[1];
                defaultWidth = pastedData.match(/default-width="(.*?)"/)[1];
              }

              let src = pastedData.match(/src="(.*?)"/);
              if (src) {
                hiddenImage.onload = () => {
                  document.execCommand(
                    "insertHTML",
                    false,
                    `<img src="${src[1]}" alt="" default-height=${defaultHeight} default-width=${defaultWidth} style="height:${height}px; width:${width}px" >`
                  );
                  saveUpdates();
                };
                hiddenImage.src = src[1];
              } else {
                pasteHtmlAtCaret(pastedData);
              }
            }
            saveUpdates();
            stopFBLoading();
          }}
        />
      </div>
    </>
  );
}

ContentEditor.propTypes = {
  handleCursorElement: propTypes.func.isRequired,
};

export default ContentEditor;

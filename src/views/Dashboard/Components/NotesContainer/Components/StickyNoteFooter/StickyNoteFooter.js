import { useStoreActions } from "easy-peasy";
import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  BaseIconsDefinitions,
  ControlIconsDefinitions,
} from "../../../../../../Assets/Font/IconMap";

function StickyNoteFooter({
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isList,
  setIsList,
  isStrike,
  setIsStrike,
  data,
}) {
  const editedAt = useMediaQuery({
    query: "(max-width: 450px)",
  });

  const setSelectedNoteContent = useStoreActions(
    (action) => action.setSelectedNoteContent
  );

  return (
    <footer className="StickyNoteWrapper__toolbar">
      <div className="StickyNoteWrapper__toolbar--left">
        <button
          className={`StickyNoteWrapper__toolbar--left--item ${
            isBold ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
          onClick={() => {
            setIsBold(!isBold);
            document.execCommand("bold", false);
          }}
        >
          <span className="baseIcons">{BaseIconsDefinitions.Bold}</span>
        </button>
        <button
          className={`StickyNoteWrapper__toolbar--left--item ${
            isItalic ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
          onClick={() => {
            setIsItalic(!isItalic);
            document.execCommand("italic", false);
          }}
        >
          <span className="baseIcons">{BaseIconsDefinitions.Italic}</span>
        </button>
        <button
          className={`StickyNoteWrapper__toolbar--left--item ${
            isList ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
          onClick={() => {
            setIsList(!isList);
            document.execCommand("insertUnorderedList", false);
          }}
        >
          <span className="baseIcons">{BaseIconsDefinitions.BulletedList}</span>
        </button>
        <button
          className={`StickyNoteWrapper__toolbar--left--item ${
            isStrike ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
          onClick={() => {
            setIsStrike(!isStrike);
            document.execCommand("strikeThrough", false);
          }}
        >
          <span className="baseIcons">
            {BaseIconsDefinitions.Strikethrough}
          </span>
        </button>
        <input
          id="photoUpload"
          style={{ display: "none", position: "absolute" }}
          type="file"
          accept="image/*"
          onChange={(e) => {
            var file = document.querySelector("input[type=file]")["files"][0];
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

                // console.log(`<img src="${baseString}" alt="" default-height=${hiddenImage.height} default-width=${hiddenImage.width} >`)
                setSelectedNoteContent({
                  id: data.id,
                  content:
                    document.querySelector(
                      ".StickyNoteWrapper__content--editableContent"
                    ).innerHTML +
                    `<img src="${baseString}" alt="" default-height=${hiddenImage.height} default-width=${hiddenImage.width} >`,
                  sanitizedContent: document.querySelector(
                    ".StickyNoteWrapper__content--editableContent"
                  ).innerText,
                });
              };
              hiddenImage.src = baseString;
            };
            reader.readAsDataURL(file);
          }}
        />
        <label
          className={`StickyNoteWrapper__toolbar--left--item ${
            false ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
          htmlFor="photoUpload"
        >
          <span className="controlIcons">{ControlIconsDefinitions.Photo2}</span>
        </label>
      </div>

      {!editedAt && (
        <div className="StickyNoteWrapper__toolbar--right">
          <span>
            Modified: {data.lastModified.today + " " + data.lastModified.time}
          </span>
        </div>
      )}
    </footer>
  );
}

export default StickyNoteFooter;

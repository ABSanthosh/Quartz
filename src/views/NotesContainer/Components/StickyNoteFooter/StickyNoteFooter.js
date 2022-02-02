import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  BaseIconsDefinitions,
} from "../../../../Assets/Font/IconMap";

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

import React from "react";
import Bold from "../../../../../../Assets/Img/StickyNotes/Bold.png";
import List from "../../../../../../Assets/Img/StickyNotes/list.png";
import Italics from "../../../../../../Assets/Img/StickyNotes/Italic.png";
import Strike from "../../../../../../Assets/Img/StickyNotes/strikethrough.png";
import { ReactComponent as Photo } from "../../../../../../Assets/Img/StickyNotes/photo.svg";

function StickyNoteFooter({
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isList,
  setIsList,
  isStrike,
  setIsStrike,
  data
}) {
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
          <img src={Bold} alt="bold" />
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
          <img src={Italics} alt="Italics" />
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
          <img src={List} alt="List" />
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
          <img src={Strike} alt="Strike" />
        </button>
        <button
          className={`StickyNoteWrapper__toolbar--left--item ${
            false ? "StickyNoteWrapper__toolbar--left--item--active" : ""
          }`}
        >
          <Photo />
        </button>
      </div>

      <div className="StickyNoteWrapper__toolbar--right">
        <span>Modified: {data.lastModified}</span>
      </div>
    </footer>
  );
}

export default StickyNoteFooter;

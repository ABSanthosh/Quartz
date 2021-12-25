import React, { useState } from "react";
import PropTypes from "prop-types";
import "./StickyNote.scss";
import { ReactComponent as Dots } from "../../../../Assets/Img/StickyNotes/dots.svg";
import { ReactComponent as Photo } from "../../../../Assets/Img/StickyNotes/photo.svg";
import Bold from "../../../../Assets/Img/StickyNotes/Bold.png";
import Italics from "../../../../Assets/Img/StickyNotes/Italic.png";
import List from "../../../../Assets/Img/StickyNotes/list.png";
import Strike from "../../../../Assets/Img/StickyNotes/strikethrough.png";

function StickyNote({ data }) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isStrike, setIsStrike] = useState(false);

  return (
    <div
      className="StickyNoteWrapper"
      style={{ backgroundColor: data.theme.primary }}
    >
      <header className="StickyNoteWrapper__header">
        <div
          className="StickyNoteWrapper__header--stripe"
          style={{ backgroundColor: data.theme.secondary }}
        />
        <div className="StickyNoteWrapper__header--details">
          <Dots />
        </div>
      </header>
      <article className="StickyNoteWrapper__content">
        <div className="StickyNoteWrapper__content--editableContent">
          {data.content}
        </div>
      </article>
      <footer className="StickyNoteWrapper__toolbar">
        <div className="StickyNoteWrapper__toolbar--left">
          <div
            className={`StickyNoteWrapper__toolbar--left--item ${
              isBold ? "StickyNoteWrapper__toolbar--left--item--active" : ""
            }`}
            onClick={() => setIsBold(!isBold)}
          >
            <img src={Bold} alt="bold" />
          </div>
          <div
            className={`StickyNoteWrapper__toolbar--left--item ${
              isItalic ? "StickyNoteWrapper__toolbar--left--item--active" : ""
            }`}
            onClick={() => setIsItalic(!isItalic)}
          >
            <img src={Italics} alt="Italics" />
          </div>
          <div
            className={`StickyNoteWrapper__toolbar--left--item ${
              isList ? "StickyNoteWrapper__toolbar--left--item--active" : ""
            }`}
            onClick={() => setIsList(!isList)}
          >
            <img src={List} alt="List" />
          </div>
          <div
            className={`StickyNoteWrapper__toolbar--left--item ${
              isStrike ? "StickyNoteWrapper__toolbar--left--item--active" : ""
            }`}
            onClick={() => setIsStrike(!isStrike)}
          >
            <img src={Strike} alt="Strike" />
          </div>
          <div
            className={`StickyNoteWrapper__toolbar--left--item ${
              isBold ? "StickyNoteWrapper__toolbar--left--item--active" : ""
            }`}
          >
            <Photo />
          </div>
        </div>

        <div className="StickyNoteWrapper__toolbar--right">
          <span>Modified: {data.lastModified}</span>
        </div>
      </footer>
    </div>
  );
}

StickyNote.propTypes = {
  data: PropTypes.object.isRequired,
};

StickyNote.defaultProps = {};

export default StickyNote;
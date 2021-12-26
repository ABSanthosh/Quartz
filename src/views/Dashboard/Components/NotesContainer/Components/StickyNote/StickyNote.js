import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./StickyNote.scss";
import { ReactComponent as Dots } from "../../../../../../Assets/Img/StickyNotes/dots.svg";
import { ReactComponent as Photo } from "../../../../../../Assets/Img/StickyNotes/photo.svg";

import Bold from "../../../../../../Assets/Img/StickyNotes/Bold.png";
import Italics from "../../../../../../Assets/Img/StickyNotes/Italic.png";
import List from "../../../../../../Assets/Img/StickyNotes/list.png";
import Strike from "../../../../../../Assets/Img/StickyNotes/strikethrough.png";
import ContextMenu from "../ContextMenu/ContextMenu";

import { useStoreState } from "easy-peasy";

function StickyNote() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [isContext, setIsContext] = useState(false);

  const data = useStoreState((state) => state.selectedNote);


  return (
    <div
      className="StickyNoteWrapper"
      style={{ backgroundColor: data.theme.primary }}
      onContextMenu={(e) => {
        console.log(data);
      }}
    >
      <ContextMenu
        setIsContext={setIsContext}
        data={data}
        isContext={isContext}
        className="StickyNoteWrapper--contextMenu"
      />
      <header className="StickyNoteWrapper__header">
        <div
          className="StickyNoteWrapper__header--stripe"
          style={{ backgroundColor: data.theme.secondary }}
        />
        <div className="StickyNoteWrapper__header--details">
          <Dots
            className="StickyNoteWrapper__optionsButton"
            onClick={() => {
              setIsContext(!isContext);
              const optionsButton = document.querySelector(
                ".StickyNoteWrapper__optionsButton"
              );
              var position = optionsButton.getBoundingClientRect();
              var positionX = position.x;
              var positionY = position.y;

              var contextMenu = document.querySelector(
                ".StickyNoteWrapper--contextMenu"
              );

              contextMenu.style.left =
                positionX -
                (contextMenu.clientWidth - optionsButton.clientWidth) +
                "px";
              contextMenu.style.top = positionY + 8 + "px";
            }}
          />
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

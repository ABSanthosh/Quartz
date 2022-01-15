import PropTypes from "prop-types";
import React, { useState } from "react";
import ContextMenu from "../ContextMenu/ContextMenu";

import { ReactComponent as Dots } from "../../../../../../Assets/Img/StickyNotes/dots.svg";

import { useStoreState } from "easy-peasy";
import { useMediaQuery } from "react-responsive";

import "./StickyNote.scss";
import ContentEditor from "./ContentEditor";
import StickyNoteFooter from "../StickyNoteFooter/StickyNoteFooter";

function StickyNote() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [isContext, setIsContext] = useState(false);

  const data = useStoreState((state) => state.selectedNote);

  const contextMenuPositionState = useMediaQuery({
    query: "(max-width: 840px)",
  });

  const handleCursorElement = () => {
    let element = window.getSelection().getRangeAt(0)
      .commonAncestorContainer.parentNode;

    let elementList = [];
    while (
      element.className !== "StickyNoteWrapper__content--editableContent"
    ) {
      elementList.push(element.tagName);
      element = element.parentNode;
    }

    if (elementList.includes("B")) {
      setIsBold(true);
    } else {
      setIsBold(false);
    }

    if (elementList.includes("I")) {
      setIsItalic(true);
    } else {
      setIsItalic(false);
    }

    if (elementList.includes("UL")) {
      setIsList(true);
    } else {
      setIsList(false);
    }

    if (elementList.includes("STRIKE")) {
      setIsStrike(true);
    } else {
      setIsStrike(false);
    }
  };

  return (
    <div
      className="StickyNoteWrapper"
      style={{ backgroundColor: data.theme.primary }}
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

              !contextMenuPositionState
                ? (contextMenu.style.top = positionY + 8 + "px")
                : (contextMenu.style.top = 52 + "px");
            }}
          />
        </div>
      </header>
      <article className="StickyNoteWrapper__content">
        <ContentEditor handleCursorElement={handleCursorElement} />
      </article>

      <StickyNoteFooter
        data={data}
        isBold={isBold}
        setIsBold={setIsBold}
        isItalic={isItalic}
        setIsItalic={setIsItalic}
        isList={isList}
        setIsList={setIsList}
        isStrike={isStrike}
        setIsStrike={setIsStrike}
      />
    </div>
  );
}

StickyNote.propTypes = {
  data: PropTypes.object.isRequired,
};

StickyNote.defaultProps = {};

export default StickyNote;

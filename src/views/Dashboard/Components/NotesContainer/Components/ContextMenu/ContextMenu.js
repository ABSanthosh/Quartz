import { useStoreActions } from "easy-peasy";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as RightArrow } from "../../../../../../Assets/Img/StickyNotes/right.svg";
import { themes } from "../../../../../../Store/defaultValues";
import "./ContextMenu.scss";

function ContextMenu({ data, isContext, setIsContext, className, direction }) {
  const [isColorOption, setIsColorOption] = useState(false);
  const setSelectedNoteColor = useStoreActions(
    (actions) => actions.setSelectedNoteColor
  );

  // const data = useStoreState((state) => state.selectedNote);
  const deleteNote = useStoreActions((actions) => actions.deleteNote);
  const addNote = useStoreActions((actions) => actions.addNote);

  const isDescendant = function (child) {
    let parent = document.querySelector(".ContextMenuWrapper");
    let node = child.parentNode;
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  function handleClick({ target }) {
    // console.log(
    //   target.className.baseVal ? target.className.baseVal : target.className
    // );
    if (
      !optionRef.current.contains(target) ||
      !optionRef.current === target ||
      !isDescendant(
        document.querySelector(
          `.${
            target.className.baseVal
              ? target.className.baseVal
              : target.className
          }`
        )
      )
    ) {
      setIsContext(false);
      setIsColorOption(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const optionRef = useRef();
  return (
    <div
      className={`ContextMenuWrapper ${className}`}
      ref={optionRef}
      style={{ visibility: isContext ? "visible" : "hidden" }}
    >
      <button
        className="ContextMenuWrapper--item"
        onClick={() => {
          setIsColorOption(!isColorOption);
        }}
      >
        <p className="ContextMenuWrapper__heading">Change Color</p>
        <RightArrow className="ContextMenuWrapper__chevron" />
        <div
          className="ContextMenuWrapper--item__ColorOptionBox"
          style={
            direction === "left"
              ? {
                  visibility: isColorOption ? "visible" : "hidden",
                  left: "-180.45px",
                }
              : {
                  visibility: isColorOption ? "visible" : "hidden",
                  left: "180.45px",
                }
          }
        >
          {Object.keys(themes).map((item, key) => (
            <div
              key={key}
              className="ContextMenuWrapper--item__ColorOptionBox--item"
              onClick={() => {
                setSelectedNoteColor({ id: data.id, theme: themes[item] });
                setIsContext(false);
              }}
            >
              <div className="ContextMenuWrapper__checkMark" />
              <div
                className="ContextMenuWrapper__colorBall"
                style={{ backgroundColor: themes[item].primary }}
              />
              <span className="ContextMenuWrapper__colorName">{item}</span>
            </div>
          ))}
        </div>
      </button>

      <button
        className="ContextMenuWrapper--item"
        onClick={() => {
          deleteNote(data.id);
          setIsContext(false);
        }}
      >
        <p className="ContextMenuWrapper__heading ">Delete Note</p>
      </button>
      <button
        className="ContextMenuWrapper--item"
        onClick={() => {
          addNote();
          setIsContext(false);
        }}
      >
        <p className="ContextMenuWrapper__heading ">New Note</p>
      </button>
    </div>
  );
}

ContextMenu.propTypes = {
  data: PropTypes.object,
  isContext: PropTypes.bool,
  setIsContext: PropTypes.func,
  className: PropTypes.string,
  direction: PropTypes.string,
};

ContextMenu.defaultProps = {
  direction: "left",
};

export default ContextMenu;

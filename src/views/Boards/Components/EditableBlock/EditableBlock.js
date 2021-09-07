import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./EditableBlock.scss";
import ContentEditable from "react-contenteditable";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function EditableBlock({
  id,
  html,
  tagName,
  onChange,
  addBlock,
  tabIndex,
  onKeyDown,
  className,
  updateData,
  isDisabled,
  isPageBlock,
  placeholder,
  removeCurrentBlock,
  deletePreviousBlock,
  ...props
}) {
  const blockRef = useRef();
  // TODO: Make / command box and take tag input
  return (
    <ContentEditable
      className={`EditableBlockWrapper ${className} ${
        html === "" ? "EditableBlockPlaceHolder" : ""
      }`}
      tabIndex={tabIndex}
      innerRef={blockRef}
      tagName={tagName}
      data-id={id}
      html={html}
      disabled={isDisabled}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e);
        updateData({ id: id, html: blockRef.current.innerHTML });
      }}
      onKeyDown={(e) => {
        onKeyDown(e);
        if (e.key === "Enter") {
          e.preventDefault();
          addBlock({
            id: id,
            ref: blockRef,
            offset: window.getSelection().anchorOffset,
          });
        }
        if (e.key === "Backspace" && window.getSelection().anchorOffset === 0) {
          e.preventDefault();
          removeCurrentBlock({ id: id, ref: blockRef });
        }
        if (
          e.key === "Delete" &&
          blockRef.current.nextSibling &&
          window.getSelection().anchorOffset ===
            blockRef.current.innerHTML.length
        ) {
          e.preventDefault();
          deletePreviousBlock({ id: id, ref: blockRef });
        }
        if (e.key === "ArrowDown" && blockRef.current.nextSibling) {
          e.preventDefault();
          setCaretToEnd(blockRef.current, e.key);
        }
        if (e.key === "ArrowUp" && blockRef.current.previousElementSibling) {
          e.preventDefault();
          setCaretToEnd(blockRef.current, e.key);
        }
        if (e.key === "ArrowLeft" && window.getSelection().anchorOffset === 0) {
          e.preventDefault();
          setCaretToEnd(blockRef.current, e.key);
        }
        if (
          e.key === "ArrowRight" &&
          window.getSelection().anchorOffset ===
            blockRef.current.innerHTML.length
        ) {
          e.preventDefault();
          setCaretToEnd(blockRef.current, e.key);
        }
      }}
      {...props}
    />
  );
}

EditableBlock.propTypes = {
  id: PropTypes.string,
  html: PropTypes.string,
  onChange: PropTypes.func,
  addBlock: PropTypes.func,
  onKeyDown: PropTypes.func,
  tagName: PropTypes.string,
  tabIndex: PropTypes.number,
  isDisabled: PropTypes.bool,
  updateData: PropTypes.func,
  isPageBlock: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  removeCurrentBlock: PropTypes.func,
  deletePreviousBlock: PropTypes.func,
};

EditableBlock.defaultProps = {
  id: "",
  html: "",
  tabIndex: 0,
  className: "",
  tagName: "div",
  placeholder: "",
  isDisabled: false,
  isPageBlock: false,
  onChange: () => {},
  addBlock: () => {},
  onKeyDown: () => {},
  updateData: () => {},
  removeCurrentBlock: () => {},
  deletePreviousBlock: () => {},
};

export default EditableBlock;

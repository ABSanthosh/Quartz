import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./EditableBlock.scss";
import ContentEditable from "react-contenteditable";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function EditableBlock({
  id,
  html,
  pageRef,
  tagName,
  onChange,
  addBlock,
  tabIndex,
  className,
  updateData,
  isDisabled,
  placeholder,
  removeCurrentBlock,
  deletePreviousBlock,
  ...props
}) {
  const blockRef = useRef();
  return (
    <ContentEditable
      className={`EditableBlockWrapper ${className} ${
        html === "" ? "EditableBlockPlaceHolder" : ""
      }`}
      tabIndex={tabIndex}
      innerRef={blockRef}
      tagName={tagName}
      html={html}
      disabled={isDisabled}
      placeholder={placeholder}
      onChange={(e) => {
        updateData({ id: id, html: blockRef.current.innerHTML,parentRef: pageRef });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addBlock({ id: id, ref: blockRef,parentRef: pageRef });
        }
        if (
          e.key === "Backspace" &&
          (html === "" || blockRef.current.innerHTML === "")
        ) {
          e.preventDefault();
          removeCurrentBlock({ id: id, ref: blockRef,parentRef: pageRef });
        }
        if (
          e.key === "Delete" &&
          blockRef.current.nextSibling &&
          window.getSelection().anchorOffset ===
            blockRef.current.innerHTML.length
        ) {
          e.preventDefault();
          deletePreviousBlock({ id: id, ref: blockRef,parentRef: pageRef });
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
  tagName: PropTypes.string,
  tabIndex: PropTypes.number,
  isDisabled: PropTypes.bool,
  updateData: PropTypes.func,
  className: PropTypes.string,
  testFunction: PropTypes.func,
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
  onChange: () => {},
  addBlock: () => {},
  updateData: () => {},
  testFunction: () => {},
  removeCurrentBlock: () => {},
  deletePreviousBlock: () => {},
};

export default EditableBlock;

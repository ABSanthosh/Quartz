import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./EditableBlock.scss";
import ContentEditable from "react-contenteditable";

function EditableBlock({
  className,
  tagName,
  onChange,
  html,
  placeholder,
  addBlock,
  removeBlock,
  isDisabled,
  updateData,
  id,
  ...props
}) {
  const blockRef = useRef();

  const [innerHtml, setInnerHtml] = useState(html);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  return (
    <ContentEditable
      className={`EditableBlockWrapper ${className} ${
        html === "" ? "EditableBlockPlaceHolder" : ""
      }`}
      innerRef={blockRef}
      tagName={tagName}
      html={html}
      disabled={isDisabled}
      placeholder={isPlaceholder ? placeholder : ""}
      onChange={(e) => {
        updateData({ id: id, html: blockRef.current.innerHTML });
        // setInnerHtml(blockRef.current.innerHTML);
        // if (blockRef.current.innerHTML === "") {
        //   setIsPlaceholder(true);
        // } else {
        //   setIsPlaceholder(false);
        // }
        // console.log(blockRef.current.innerHTML);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          console.log("enter")
          addBlock({ id: id, ref: blockRef });
        }
        if (e.key === "Backspace" && html === "") {
          e.preventDefault();
          removeBlock({ id: id, ref: blockRef });
        }
      }}
      {...props}
    />
  );
}

EditableBlock.propTypes = {
  className: PropTypes.string,
  tagName: PropTypes.string,
  onChange: PropTypes.func,
  html: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  addBlock: PropTypes.func,
  id: PropTypes.string,
  removeBlock: PropTypes.func,
  updateData: PropTypes.func,
};

EditableBlock.defaultProps = {
  className: "",
  tagName: "div",
  onChange: () => {},
  html: "",
  placeholder: "",
  isDisabled: false,
  addBlock: () => {},
  id: "",
  removeBlock: () => {},
  updateData: () => {},
};

export default EditableBlock;

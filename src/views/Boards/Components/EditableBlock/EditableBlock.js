import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./EditableBlock.scss";
import ContentEditable from "react-contenteditable";
import setCaretToEnd from "../../../../Utils/setCaretToEnd";

function EditableBlock({
  className,
  tagName,
  onChange,
  html,
  placeholder,
  addBlock,
  tabIndex,
  removeCurrentBlock,
  isDisabled,
  updateData,
  deletePreviousBlock,
  id,
  ...props
}) {
  const blockRef = useRef();

  // const [innerHtml, setInnerHtml] = useState(html);
  // const [isPlaceholder, setIsPlaceholder] = useState(true);
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
        updateData({ id: id, html: blockRef.current.innerHTML });
      }}
      onKeyDown={(e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
          e.preventDefault();
          addBlock({ id: id, ref: blockRef });
        }
        if (
          e.key === "Backspace" &&
          (html === "" || blockRef.current.innerHTML === "")
        ) {
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
  className: PropTypes.string,
  tagName: PropTypes.string,
  onChange: PropTypes.func,
  html: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  addBlock: PropTypes.func,
  id: PropTypes.string,
  removeCurrentBlock: PropTypes.func,
  updateData: PropTypes.func,
  tabIndex: PropTypes.number,
  deletePreviousBlock: PropTypes.func,
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
  removeCurrentBlock: () => {},
  updateData: () => {},
  tabIndex: 0,
  deletePreviousBlock: () => {},
};

export default EditableBlock;

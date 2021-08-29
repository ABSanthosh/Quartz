import React from "react";
import PropTypes from "prop-types";
import "./EditableBlock.scss";
import ContentEditable from "react-contenteditable";

function EditableBlock({
  className,
  tagName,
  onChange,
  html,
  placeholder,
  isDisabled,
}) {
  console.log(html === "");
  return (
    <ContentEditable
      className={`EditableBlockWrapper ${className} ${
        html === "" ? "EditableBlockPlaceHolder" : ""
      }`}
      tagName={tagName}
      onChange={onChange}
      html={html}
      disabled={isDisabled}
      placeholder={placeholder}
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
};

EditableBlock.defaultProps = {
  // bla: 'test',
};

export default EditableBlock;

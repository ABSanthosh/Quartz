import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SmallContentEditable.scss";
import ContentEditable from "react-contenteditable";

function SmallContentEditable({
  html,
  setNewValue,
  setOptionalEllipsis,
  ...props
}) {
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  return (
    <ContentEditable
      {...props}
      className={`SmallContentEditableWrapper--title ${
        isEllipsisable ? "SmallContentEditableWrapper--ellipsis" : ""
      }`}
      html={html}
      onSubmit={(e) => {
        e.target.blur();
        e.preventDefault();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.target.blur();
          e.preventDefault();
        }
        if (
          e.target.innerText.length >= 40 &&
          e.key !== "Backspace" &&
          e.key !== "Delete"
        ) {
          e.preventDefault();
        }
      }}
      onBlur={(e) => {
        e.target.scrollTo(0, 0);
        setIsEllipsisable(true);
        setOptionalEllipsis(true);
      }}
      onFocus={(e) => {
        e.target.scrollTo(e.target.scrollWidth, 0);
        setIsEllipsisable(false);
        setOptionalEllipsis(false);
      }}
      onChange={(e) => {
        setNewValue(e.target.value);
      }}
      spellCheck="false"
    />
  );
}

SmallContentEditable.propTypes = {
  html: PropTypes.string.isRequired,
  setNewValue: PropTypes.func.isRequired,
  setOptionalEllipsis: PropTypes.func,
};

SmallContentEditable.defaultProps = {
  setOptionalEllipsis: () => {},
};

export default SmallContentEditable;

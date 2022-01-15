import React from "react";
import PropTypes from "prop-types";
import "./FancyButton.scss";

function FancyButton({ text, className, children, ...props }) {
  return (
    <div {...props} className={`FancyButtonWrapper ${className}`}>
      {children}
      {text}
    </div>
  );
}

FancyButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

FancyButton.defaultProps = {
  className: "",
  children: null,
  onClick: () => {},
};

export default FancyButton;

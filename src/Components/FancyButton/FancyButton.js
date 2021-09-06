import React from "react";
import PropTypes from "prop-types";
import "./FancyButton.scss";
// import { useAuth } from "../../hooks/useAuth";

function FancyButton({ text, className, children, ...props }) {
  return (
    <div
      {...props}
      className={`FancyButtonWrapper ${className}`}
    >
      {text}
      {children}
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

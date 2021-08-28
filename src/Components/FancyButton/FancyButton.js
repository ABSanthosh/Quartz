import React from "react";
import PropTypes from "prop-types";
import "./FancyButton.scss";
// import { useAuth } from "../../hooks/useAuth";

function FancyButton({ text, className, isLogin, children, ...props }) {
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
  isLogin: PropTypes.bool,
};

FancyButton.defaultProps = {
  className: "",
  children: null,
  isLogin: false,
};

export default FancyButton;

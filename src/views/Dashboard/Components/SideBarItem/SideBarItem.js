import React from "react";
import PropTypes from "prop-types";
import "./SideBarItem.scss";

function SideBarItem({ children, text, isActive, ...props }) {
  return (
    <div
      className={`SideBarItemWrapper ${
        isActive ? "SideBarItemWrapperActive" : ""
      }`}
      {...props}
    >
      {children}
      <p>{text}</p>
    </div>
  );
}

SideBarItem.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
};

SideBarItem.defaultProps = {
  children: null,
};

export default SideBarItem;

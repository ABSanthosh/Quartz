import React from "react";
import PropTypes from "prop-types";
import "./SideBarItem.scss";

function SideBarItem({ children, text, isActive, count, ...props }) {
  return (
    <div
      className={`SideBarItemWrapper ${
        isActive ? "SideBarItemWrapperActive" : ""
      }`}
      {...props}
    >
      {children}
      <p>{text}</p>
      {count || (count !== 0 && <span>{count}</span>)}
    </div>
  );
}

SideBarItem.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  count: PropTypes.number,
};

SideBarItem.defaultProps = {
  children: null,
  isActive: false,
  count: null,
};

export default SideBarItem;

import "./Header.scss";
import React, { useState } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Header({ children }) {
  const [navState, setNavState] = useState(false);

  return (
    <div className="HeaderWrapper">
      <div className="HeaderWrapper__Logo">
        <Link to="/" className="HeaderWrapper__Logo--text">
          QUARTZ
        </Link>
      </div>
      <div className="HeaderWrapper__Hamburger">
        <input
          type="checkbox"
          id="NavBarInput"
          onChange={() => {
            setNavState(!navState);
          }}
        />
        <div className="hamButton">
          <label className="HamMenu" htmlFor="NavBarInput">
            <span className="span HL1" />
            <span className="span HL2" />
            <span className="span HL3" />
          </label>
        </div>
      </div>
      <div
        className={`HeaderWrapper__Menu ${
          navState ? "HeaderWrapper__Menu--open" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;

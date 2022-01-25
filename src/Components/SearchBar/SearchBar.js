import propTypes from "prop-types";
import React, { useState } from "react";
import "./SearchBar.scss";

function SearchBar({ callBack, placeholder, ...props }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="SearchBarWrapper" {...props}>
      <div className="SearchBarWrapper__icon" />
      <input
        className="SearchBarWrapper__input"
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          callBack(e.target.value);
        }}
      />
      {inputValue.length > 0 && (
        <div
          className="SearchBarWrapper__clear"
          onClick={() => {
            setInputValue("");
            callBack("");
            document.querySelector(".SearchBarWrapper__input").value = "";
            document.querySelector(".SearchBarWrapper__input").focus();
          }}
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  callBack: propTypes.func.isRequired,
};

SearchBar.defaultProps = {
};

export default SearchBar;

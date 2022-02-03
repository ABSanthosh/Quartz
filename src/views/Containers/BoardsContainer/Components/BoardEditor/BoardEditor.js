import React, { useState } from "react";
import PropTypes from "prop-types";
import "./BoardEditor.scss";
import { ControlIconsDefinitions } from "../../../../../Assets/Font/IconMap";
import ContentEditable from "react-contenteditable";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

function BoardEditor({ navState }) {
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  const selectedBoard = useStoreState((state) => state.selectedBoard);
  const setSelectedBoardTitle = useStoreActions(
    (action) => action.setSelectedBoardTitle
  );

  return (
    <>
      <div className="DashboardWrapper__subHeader">
        <div
          className={`DashboardWrapper__subHeader--left ${
            navState ? "DashboardWrapper__subHeader--left--open" : ""
          }`}
        >
          <Link to="/app/dashboard/boards">Boards</Link>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "bolder",
              margin: "0 4px 0 6px",
            }}
            className="controlIcons"
          >
            {ControlIconsDefinitions.ChevronRight}
          </span>
          <ContentEditable
            className={`DashboardWrapper__subHeader--left--title ${
              isEllipsisable
                ? "DashboardWrapper__subHeader--left--ellipsis"
                : ""
            }`}
            html={selectedBoard ? selectedBoard.title : ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
            }}
            onFocus={(e) => {
              e.target.scrollTo(e.target.scrollWidth, 0);
              setIsEllipsisable(false);
            }}
            onChange={(e) => {
              setSelectedBoardTitle({
                id: selectedBoard.id,
                title: e.target.value,
              });
            }}
            spellCheck="false"
          />
          {isEllipsisable && (
            <span
              style={{ fontSize: "15px", color: "#a5a5a5" }}
              className="controlIcons"
            >
              {ControlIconsDefinitions.Edit}
            </span>
          )}
        </div>
        <div className="DashboardWrapper__subHeader--right"></div>
      </div>
      <div className="BoardEditorWrapper">Test content</div>
    </>
  );
}

BoardEditor.propTypes = {
  navState: PropTypes.bool.isRequired,
};

BoardEditor.defaultProps = {};

export default BoardEditor;

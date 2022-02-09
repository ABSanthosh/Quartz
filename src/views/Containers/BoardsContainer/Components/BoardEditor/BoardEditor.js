import React, { useState } from "react";
import PropTypes from "prop-types";
import "./BoardEditor.scss";
import { ControlIconsDefinitions } from "../../../../../Assets/Font/IconMap";
import { action, useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import SmallContentEditable from "../../../../../Components/SmallContentEditable/SmallContentEditable";

function BoardEditor({ navState }) {
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  const selectedBoard = useStoreState((state) => state.selectedBoard);
  const setSelectedBoardTitle = useStoreActions(
    (action) => action.setSelectedBoardTitle
  );
  const addPanel = useStoreActions((action) => action.addPanel);
  const setBoardStarState = useStoreActions(
    (action) => action.setBoardStarState
  );
  const addPanelItem = useStoreActions((action) => action.addPanelItem);
  const setBoardPanelTitle = useStoreActions(
    (action) => action.setBoardPanelTitle
  );
  const [isHovering, setIsHovering] = useState(false);

  const closeStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.685)",
    backdropFilter: "blur(60px)",
    borderRadius: "4px",
    padding: navState ? "2px 10px 2px 10px" : "2px 10px 2px 40px",
    transform: "translateX(8px)",
  };

  return (
    <>
      <div className="DashboardWrapper__subHeader">
        <div
          className={`DashboardWrapper__subHeader--left ${
            navState ? "DashboardWrapper__subHeader--left--open" : ""
          }`}
          style={closeStyle}
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
          <span
            className={`icon-lg icon-star${
              selectedBoard.isStarred && !isHovering ? "-starred" : ""
            } BoardsHomeWrapper__item__subContainer--star${
              selectedBoard.isStarred ? "Active" : ""
            }`}
            title={
              selectedBoard.isStarred
                ? "Click to remove from starred list"
                : "Click to add to starred list"
            }
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              console.log(selectedBoard.isStarred);

              setBoardStarState({
                id: parseInt(selectedBoard.id),
                starState: !selectedBoard.isStarred,
              });
            }}
            style={{
              fontSize: "20px",
              marginRight: "0px",
              cursor: "pointer",
              color: selectedBoard.isStarred ? "#f2d600" : "black",
              opacity: "1",
            }}
          />
          <SmallContentEditable
            html={selectedBoard.title}
            setOptionalEllipsis={setIsEllipsisable}
            setNewValue={(newValue) => {
              setSelectedBoardTitle({
                id: selectedBoard.id,
                title: newValue,
              });
            }}
          />
          {isEllipsisable && (
            <span
              style={{ fontSize: "15px", color: "#a5a5a5", marginLeft: "10px" }}
              className="controlIcons"
            >
              {ControlIconsDefinitions.Edit}
            </span>
          )}
        </div>
        <div className="DashboardWrapper__subHeader--right"></div>
      </div>
      <div className="BoardEditorWrapper">
        <div className="BoardEditorWrapper__contentContainer">
          {selectedBoard.boardPanels.map((panel, index) => {
            return (
              <div className="BoardEditorWrapper__panel" key={index}>
                <div className="BoardEditorWrapper__panel--title">
                  <div className="BoardEditorWrapper__panel--title--left">
                    <SmallContentEditable
                      html={panel.title}
                      setNewValue={(newValue) => {
                        setBoardPanelTitle({
                          id: panel.id,
                          title: newValue,
                        });
                      }}
                    />
                  </div>
                  <div className="BoardEditorWrapper__panel--title--right">
                    <span className="controlIcons" style={{ cursor: "grab" }}>
                      {ControlIconsDefinitions.More}
                    </span>
                    <span
                      className="controlIcons"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        addPanelItem({
                          id: panel.id,
                        });
                      }}
                    >
                      {ControlIconsDefinitions.Add}
                    </span>
                  </div>
                </div>
                {panel.panelItems.length !== 0 && (
                  <div className="BoardEditorWrapper__panel--content">
                    {panel.panelItems.map((card, index) => {
                      return (
                        <div
                          className="BoardEditorWrapper__panel--content--card"
                          key={index}
                        >
                          {card.content}
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* <div className="BoardEditorWrapper__panel--bottom">
                  <div
                    className="BoardEditorWrapper__panel--content--placeholderCard"
                    onClick={() => {
                      addPanelItem({
                        id: panel.id,
                      });
                    }}
                  >
                    <span className="controlIcons" style={{ fontSize: "15px" }}>
                      {ControlIconsDefinitions.Add}
                    </span>
                    Add Item
                  </div>
                </div> */}
              </div>
            );
          })}
          <div
            className="BoardEditorWrapper__contentContainer--addPanel"
            onClick={() => {
              addPanel({});
            }}
          >
            <span className="controlIcons">{ControlIconsDefinitions.Add}</span>
            Add Panel
          </div>
        </div>
      </div>
    </>
  );
}

BoardEditor.propTypes = {
  navState: PropTypes.bool.isRequired,
};

BoardEditor.defaultProps = {};

export default BoardEditor;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./BoardEditor.scss";
import { ControlIconsDefinitions } from "../../../../../Assets/Font/IconMap";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import SmallContentEditable from "../../../../../Components/SmallContentEditable/SmallContentEditable";

function BoardEditor({ navState }) {
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  const selectedBoard = useStoreState((state) => state.selectedBoard);
  const setSelectedBoardTitle = useStoreActions(
    (action) => action.setSelectedBoardTitle
  );
  const setBoardPanelTitle = useStoreActions(
    (action) => action.setBoardPanelTitle
  );

  const addPanelItem = useStoreActions((action) => action.addPanelItem);
  const addPanel = useStoreActions((action) => action.addPanel);
  // useEffect(() => {
  //   document.querySelector(
  //     ".DashboardWrapper__frame "
  //   ).style.backgroundImage = `url(${selectedBoard.backgroundImage})`;
  //   document.querySelector(".DashboardWrapper__frame ").style.backgroundSize =
  //     "cover";

  //   document.querySelector(
  //     ".DashboardWrapper__frame "
  //   ).style.backgroundPosition = "50%";

  //   document.querySelector(".DashboardWrapper__frame ").style.backgroundRepeat =
  //     "no-repeat";
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
              style={{ fontSize: "15px", color: "#a5a5a5" }}
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
                  {panel.panelItems.length === 0 && (
                    <div
                      className="BoardEditorWrapper__panel--content--placeholderCard"
                      onClick={() => {
                        addPanelItem({
                          id: panel.id,
                        });
                      }}
                    >
                      <span
                        className="controlIcons"
                        style={{ fontSize: "15px" }}
                      >
                        {ControlIconsDefinitions.Add}
                      </span>
                      Add Item
                    </div>
                  )}
                </div>
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

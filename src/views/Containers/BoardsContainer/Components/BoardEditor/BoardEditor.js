import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./BoardEditor.scss";
import { ControlIconsDefinitions } from "../../../../../Assets/Font/IconMap";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import SmallContentEditable from "../../../../../Components/SmallContentEditable/SmallContentEditable";
import {
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Panel from "./Components/Panel";
import Card from "./Components/Card/Card";
import { createPortal } from "react-dom";

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

  const [isHovering, setIsHovering] = useState(false);

  const closeStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.685)",
    backdropFilter: "blur(60px)",
    borderRadius: "4px",
    padding: navState ? "2px 10px 2px 10px" : "2px 10px 2px 40px",
    transform: "translateX(8px)",
  };

  // DND functions
  const [activeId, setActiveId] = useState(null);
  const [boardData, setBoardData] = useState(selectedBoard);

  const setSelectedBoardData = useStoreActions(
    (action) => action.setSelectedBoardData
  );

  useEffect(() => {
    setSelectedBoardData({ id: selectedBoard.id, data: boardData });
  }, [boardData, selectedBoard.id, setSelectedBoardData]);

  useEffect(() => {
    setBoardData(selectedBoard);
  }, [selectedBoard]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      sortableKeyboardCoordinates,
    })
  );

  function findContainer(id) {
    const preResult = boardData.boardPanels.find((panel) => {
      return panel.panelItems.find((item) => {
        return item.id === id;
      });
    });

    if (preResult) {
      return preResult;
    } else {
      return boardData.boardPanels.find((panel) => {
        return panel.id === id;
      });
    }
  }

  const getIndex = (id) => {
    const panel = findContainer(id);
    return boardData.boardPanels.indexOf(panel);
  };

  function renderContainerDragOverlay(id) {
    const panel = boardData.boardPanels[getIndex(id)];
    return (
      <Panel key={panel.id} panelIndex={getIndex(id)} panel={panel}>
        {panel.panelItems.map((card, cardIndex) => (
          <Card
            key={cardIndex}
            cardIndex={cardIndex}
            card={card}
            panelId={panel.id}
            panelIndex={getIndex(id)}
            // removeCard={removeCard}
            getIndex={getIndex}
          />
        ))}
      </Panel>
    );
  }

  function renderSortableItemDragOverlay(id) {
    const cardParent = boardData.boardPanels.find((panel) => {
      return panel.panelItems.find((item) => {
        return item.id === id;
      });
    });
    const cardIndex = cardParent.panelItems.findIndex((item) => {
      return item.id === id;
    });
    const card = cardParent.panelItems[cardIndex];

    return (
      <Card
        cardIndex={cardIndex}
        card={card}
        // removeCard={removeCard}
        getIndex={getIndex}
      />
    );
  }

  function isPanelId(id) {
    const result = boardData.boardPanels.find((panel) => {
      return panel.id === id;
    });
    return result ? true : false;
  }

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
              fontSize: "21px",
              marginRight: "0px",
              cursor: "pointer",
              color: selectedBoard.isStarred ? "#ffec5a" : "black",
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
              style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}
              className="controlIcons"
            >
              {ControlIconsDefinitions.Edit}
            </span>
          )}
        </div>
        <div className="DashboardWrapper__subHeader--right"></div>
      </div>
      <div className="BoardEditorWrapper">
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            setActiveId(active.id);
          }}
          onDragOver={({ active, over }) => {
            const overId = over?.id;
            const activeId = active?.id;
            if (
              !isPanelId(overId) &&
              !isPanelId(activeId) &&
              activeId !== overId &&
              !findContainer(activeId)
                .panelItems.map((items) => items.id)
                .includes(overId)
            ) {
            }
          }}
          onDragEnd={({ active, over }) => {
            const overId = over?.id;
            const activeId = active?.id;

            // Only for items sorting inside a panel
            if (
              findContainer(activeId) === findContainer(overId) &&
              !isPanelId(overId) &&
              !isPanelId(activeId)
            ) {
              setBoardData((prev) => {
                const activeContainer = findContainer(activeId);
                const activeItemIndex = activeContainer.panelItems.findIndex(
                  (item) => {
                    return item.id === active.id;
                  }
                );

                const overItemIndex = activeContainer.panelItems.findIndex(
                  (item) => {
                    return item.id === over.id;
                  }
                );

                prev.boardPanels[getIndex(activeContainer.id)].panelItems =
                  arrayMove(
                    prev.boardPanels[getIndex(activeContainer.id)].panelItems,
                    activeItemIndex,
                    overItemIndex
                  );

                return {
                  ...prev,
                };
              });
            }

            // only for items between panels
            if (
              !isPanelId(activeId) &&
              findContainer(overId) &&
              findContainer(activeId) &&
              findContainer(activeId) !== findContainer(overId)
            ) {
              setBoardData((prev) => {
                const activeContainer = findContainer(activeId);
                const overContainer = findContainer(overId);

                const activeIndex = activeContainer.panelItems.findIndex(
                  (item) => {
                    return item.id === activeId;
                  }
                );

                const overIndex = overContainer.panelItems.findIndex((item) => {
                  return item.id === overId;
                });

                let newIndex;

                if (isPanelId(overId)) {
                  newIndex = overContainer.panelItems.length;
                } else {
                  const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                      over.rect.top + over.rect.height;

                  const modifier = isBelowOverItem ? 1 : 0;

                  newIndex =
                    overIndex >= 0
                      ? overIndex + modifier
                      : overContainer.panelItems.length + 1;
                }

                const updatedOverPanelItems = [
                  ...prev.boardPanels[
                    getIndex(overContainer.id)
                  ].panelItems.slice(0, newIndex),
                  prev.boardPanels[getIndex(activeContainer.id)].panelItems[
                    activeIndex
                  ],
                  ...prev.boardPanels[
                    getIndex(overContainer.id)
                  ].panelItems.slice(
                    newIndex,
                    prev.boardPanels[getIndex(overContainer.id)].panelItems
                      .length
                  ),
                ];

                const updatedActivePanelItems = prev.boardPanels[
                  getIndex(activeContainer.id)
                ].panelItems.filter((item) => item.id !== active.id);

                prev.boardPanels[getIndex(overContainer.id)].panelItems = [
                  ...updatedOverPanelItems,
                ];

                prev.boardPanels[getIndex(activeContainer.id)].panelItems = [
                  ...updatedActivePanelItems,
                ];

                return { ...prev };
              });
            }

            // Only for panels sorting
            if (isPanelId(activeId)) {
              setBoardData((prev) => {
                const activeContainer = findContainer(activeId);
                const overContainer = findContainer(overId);

                const activeContainerIndex = getIndex(activeContainer.id);
                const overContainerIndex = getIndex(overContainer.id);
                const updatedBoardPanels = arrayMove(
                  prev.boardPanels,
                  activeContainerIndex,
                  overContainerIndex
                );
                return { ...prev, boardPanels: updatedBoardPanels };
              });
            }

            setActiveId(null);
          }}
        >
          <div
            className="BoardEditorWrapper__contentContainer"
            style={{ scrollSnapType: activeId ? "none" : "x mandatory" }}
          >
            <SortableContext
              items={[...boardData.boardPanels]}
              strategy={horizontalListSortingStrategy}
            >
              {boardData.boardPanels.map((panel, panelIndex) => (
                <Panel key={panelIndex} panelIndex={panelIndex} panel={panel}>
                  <SortableContext
                    items={[...panel.panelItems]}
                    strategy={verticalListSortingStrategy}
                  >
                    {boardData.boardPanels[panelIndex].panelItems.map(
                      (card, cardIndex) => (
                        <Card
                          key={cardIndex}
                          cardIndex={cardIndex}
                          card={card}
                          panelId={panel.id}
                          panelIndex={panelIndex}
                          getIndex={getIndex}
                        />
                      )
                    )}
                  </SortableContext>
                </Panel>
              ))}
            </SortableContext>
            <div
              className="BoardEditorWrapper__contentContainer--addPanel"
              onClick={() => {
                addPanel({});
              }}
            >
              <span className="controlIcons">
                {ControlIconsDefinitions.Add}
              </span>
              Add Panel
            </div>
          </div>
          {createPortal(
            <DragOverlay
              adjustScale={false}
              dropAnimation={{
                ...defaultDropAnimation,
                dragSourceOpacity: 0.5,
              }}
            >
              {activeId
                ? boardData.boardPanels
                    .map((item) => item.id)
                    .includes(activeId)
                  ? renderContainerDragOverlay(activeId)
                  : renderSortableItemDragOverlay(activeId)
                : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
}

BoardEditor.propTypes = {
  navState: PropTypes.bool.isRequired,
};

BoardEditor.defaultProps = {};

export default BoardEditor;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./BoardEditor.scss";
import { ControlIconsDefinitions } from "../../../../../Assets/Font/IconMap";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import SmallContentEditable from "../../../../../Components/SmallContentEditable/SmallContentEditable";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortablePanel from "./Components/SortablePanel/SortablePanel";
import SortableItem from "./Components/SortableItem/SortableItem";

function BoardEditor({ navState }) {
  const [isEllipsisable, setIsEllipsisable] = useState(true);

  const selectedBoard = useStoreState((state) => state.selectedBoard);
  const setSelectedBoardTitle = useStoreActions(
    (action) => action.setSelectedBoardTitle
  );
  const setBoardPanelItemOrder = useStoreActions(
    (action) => action.setBoardPanelItemOrder
  );

  const addPanel = useStoreActions((action) => action.addPanel);

  const [items, setItems] = useState(selectedBoard.boardPanels);
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    setBoardPanelItemOrder(items);
  }, [activeId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {selectedBoard.boardPanels.map((panel, index) => {
              return (
                <SortablePanel
                  id={panel.id}
                  key={index}
                  panel={panel}
                  items={panel.panelItems}
                />
              );
            })}
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

            <DragOverlay>
              {activeId ? <SortableItem id={activeId} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  );
  /*
   {selectedBoard.boardPanels.map((panel, index) => (
              <SortablePanel
                key={index}
                id={panel.id}
                items={panel.panelItems}
                panel={panel}
              />
            ))}

             <div
            className="BoardEditorWrapper__contentContainer--addPanel"
            onClick={() => {
              addPanel({});
            }}
          >
            <span className="controlIcons">{ControlIconsDefinitions.Add}</span>
            Add Panel
          </div>
  */

  function findContainer(id) {
    const preResult = selectedBoard.boardPanels.find((panel) => {
      return panel.panelItems.find((item) => {
        return item.id === id;
      });
    });

    if (preResult) {
      return preResult;
    } else {
      return selectedBoard.boardPanels.find((panel) => {
        return panel.id === id;
      });
    }
  }

  function isPanelId(id) {
    return selectedBoard.boardPanels.find((panel) => {
      return panel.id === id;
    });
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev.find((item) => {
        return item.id === activeContainer.id;
      });

      const overItems = prev.find((item) => {
        return item.id === overContainer.id;
      });

      const activeIndex = activeItems.panelItems.findIndex((item) => {
        return item.id === id;
      });
      const overIndex = overItems.panelItems.findIndex((item) => {
        return item.id === overId;
      });

      let newIndex;
      if (isPanelId(overId)) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.panelItems.length - 1 &&
          active.rect.current.translated.top +
            active.rect.current.translated.height >
            over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const draggedCard = activeItems.panelItems.find((item) => {
        return item.id === activeId;
      });

      overItems.panelItems.splice(newIndex, 0, draggedCard);
      activeItems.panelItems.splice(activeIndex, 1);

      return prev;
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = activeContainer.panelItems.findIndex((item) => {
      return item.id === id;
    });
    const overIndex = overContainer.panelItems.findIndex((item) => {
      return item.id === overId;
    });

    const draggedCard = activeContainer.panelItems.find((item) => {
      return item.id === activeId;
    });

    if (activeIndex !== overIndex) {
      setItems((prev) => {
        const activeItems = prev.find((item) => {
          return item.id === activeContainer.id;
        });

        const overItems = prev.find((item) => {
          return item.id === overContainer.id;
        });

        activeItems.panelItems.splice(activeIndex, 1);
        overItems.panelItems.splice(overIndex, 0, draggedCard);

        return prev;
      });
    }
    setActiveId(null);
  }
}

BoardEditor.propTypes = {
  navState: PropTypes.bool.isRequired,
};

BoardEditor.defaultProps = {};

export default BoardEditor;

/*
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
*/

/*
<DragDropContext>
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
                  <Droppable droppableId={panel.id} key={index}>
                    {(provided, snapshot) => (
                      <div
                        className="BoardEditorWrapper__panel--content"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "",
                        }}
                      >
                        {panel.panelItems.map((card, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={card.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="BoardEditorWrapper__panel--content--card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {card.content}
                                  </div>
                                );
                              }}
                            </Draggable>
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
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>

          <div
            className="BoardEditorWrapper__contentContainer--addPanel"
            onClick={() => {
              addPanel({});
            }}
          >
            <span className="controlIcons">{ControlIconsDefinitions.Add}</span>
            Add Panel
          </div>
*/

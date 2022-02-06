import React, { useState } from "react";
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

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortablePanel from "./Components/SortablePanel/SortablePanel";
import SortableItem from "./Components/SortableItem/SortableItem";

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = useState({
    root: ["1", "2", "3"],
    container1: ["4", "5", "6"],
    container2: ["7", "8", "9"],
    container3: [],
  });
  const [activeId, setActiveId] = useState();

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
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
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
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

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

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
            announcements={defaultAnnouncements}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {selectedBoard.boardPanels.map((panel, index) => (
              <SortablePanel
                key={index}
                id={panel.id}
                items={panel.panelItems}
                panel={panel}
              />
            ))}
            <SortablePanel
              id="root"
              items={[{ title: "THis title bs", id: "root" }]}
              panel={{ title: "THis title bs", id: "root" }}
            />
            <SortablePanel
              id="root"
              items={[{ title: "THis title bs2", id: "root2" }]}
              panel={{ title: "THis title bs2", id: "root2" }}
            />

            <DragOverlay>
              {activeId ? <SortableItem id={activeId} /> : null}
            </DragOverlay>
          </DndContext>
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

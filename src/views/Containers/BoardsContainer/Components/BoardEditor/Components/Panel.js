import { useSortable } from "@dnd-kit/sortable";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { ControlIconsDefinitions } from "../../../../../../Assets/Font/IconMap";
import SmallContentEditable from "../../../../../../Components/SmallContentEditable/SmallContentEditable";
import DragHandle from "./DragHandle/DragHandle";

// aka DroppableContainer

export default function Panel({ panelIndex, panel, children }) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id: panel.id,
  });
  const items = panel.panelItems.map((item) => item.id);
  const isOverContainer = over
    ? (panel.id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id)
    : false;

  const setBoardPanelTitle = useStoreActions(
    (action) => action.setBoardPanelTitle
  );

  const addPanelItem = useStoreActions((action) => action.addPanelItem);
  const removePanel = useStoreActions((action) => action.removePanel);
  const [isHovering, setIsHovering] = useState(false);

  //TODO: add modal to confirm delete if there are panelItems

  return (
    <div
      className="BoardEditorWrapper__panel"
      key={panelIndex}
      ref={setNodeRef}
      style={{
        transition,
        transform: transform,
        opacity: isDragging ? 0.5 : undefined,
        backgroundColor: isOverContainer && "rgb(255 255 255 / 42%)",
        "--translatePanel-x": transform
          ? `${Math.round(transform.x)}px`
          : undefined,
        "--translatePanel-y": transform
          ? `${Math.round(transform.y)}px`
          : undefined,
        "--scalePanel-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
        "--scalePanel-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
      }}
    >
      <div
        className="BoardEditorWrapper__panel--title"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
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
          {isHovering && (
            <span
              className="controlIcons BoardEditorWrapper__panel__right--delete"
              onClick={() => removePanel(panel.id)}
            >
              {ControlIconsDefinitions.Delete}
            </span>
          )}
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
          <DragHandle
            {...listeners}
            {...attributes}
            className="cardWrapper__right--dragIcon"
          />
        </div>
      </div>
      <div className="BoardEditorWrapper__panel--content">{children}</div>
    </div>
  );
}

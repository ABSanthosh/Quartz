import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SmallContentEditable from "../../../../../../../Components/SmallContentEditable/SmallContentEditable";
import SortableItem from "../SortableItem/SortableItem";

import { useStoreActions } from "easy-peasy";
import { ControlIconsDefinitions } from "../../../../../../../Assets/Font/IconMap";

export default function SortablePanel({ id, items, panel }) {
  const { setNodeRef } = useDroppable({
    id,
  });
  const setBoardPanelTitle = useStoreActions(
    (action) => action.setBoardPanelTitle
  );

  const addPanelItem = useStoreActions((action) => action.addPanelItem);

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="BoardEditorWrapper__panel">
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
            {panel.id}
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
          {items.map((card, index) => (
            <SortableItem key={index} id={card.id}>
              {card.id}
            </SortableItem>
          ))}
        </div>
      </div>
    </SortableContext>
  );
}

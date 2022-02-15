import { useSortable } from "@dnd-kit/sortable";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { ControlIconsDefinitions } from "../../../../../../../Assets/Font/IconMap";
import DragHandle from "../DragHandle/DragHandle";
import "./Card.scss";
// aka SortableItem

export default function Card({ panelId, cardIndex, card, getIndex }) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id: card.id,
  });

  const removePanelItem = useStoreActions((action) => action.removePanelItem);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="CardWrapper"
      key={cardIndex}
      ref={setNodeRef}
      style={{
        // ...wrapperStyle,
        transition,
        "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
        "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
        "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
        "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="CardWrapper__content"
        style={{
          value: cardIndex,
          isDragging,
          isSorting,
          overIndex: over ? getIndex(over.id) : overIndex,
          panelId,
        }}
      >
        {card.id}
        <div className="CardWrapper__right">
          {isHovering && (
            <span
              className="controlIcons CardWrapper__right--delete"
              style={{ fontSize: "18px", height: "28px" }}
              onClick={() => {
                removePanelItem({ cardId: card.id, panelId });
              }}
            >
              {ControlIconsDefinitions.Delete}
            </span>
          )}
          <DragHandle
            {...listeners}
            style={{ border: "1px solid black" }}
            svgFill="black"
          />
        </div>
      </div>
    </div>
  );
}

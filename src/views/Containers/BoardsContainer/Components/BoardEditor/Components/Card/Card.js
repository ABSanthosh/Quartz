import { useSortable } from "@dnd-kit/sortable";
import DragHandle from "../DragHandle/DragHandle";
import "./Card.scss";
// aka SortableItem

export default function Card({
  removeCard,
  panelId,
  cardIndex,
  card,
  panelIndex,
  getIndex,
}) {
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
          <span
            className="CardWrapper__right--delete"
            onClick={() => {
              removeCard(cardIndex, panelIndex);
            }}
          >
            x
          </span>
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

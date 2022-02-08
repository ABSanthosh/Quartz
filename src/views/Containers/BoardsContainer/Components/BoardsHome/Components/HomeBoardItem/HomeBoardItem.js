import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import propTypes from "prop-types";
import { useState } from "react";

export default function HomeBoardItem({ board }) {
  const setSelectedBoard = useStoreActions((action) => action.setSelectedBoard);
  const setBoardStarState = useStoreActions(
    (action) => action.setBoardStarState
  );
  const history = useHistory();
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="BoardsHomeWrapper__item"
      onClick={(e) => {
        if (!e.target.className.includes("icon-lg icon-star")) {
          setSelectedBoard(parseInt(board.id));
          history.push(`/app/dashboard/boards/${board.id}`);
        }
      }}
      style={{
        backgroundImage: `url(${board.backgroundImage}?w=245&h=155&auto=format)`,
        backgroundSize: "cover",
      }}
    >
      <div className="BoardsHomeWrapper__item--pseudo">
        <div className="BoardsHomeWrapper__item__title">{board.title}</div>
        <div className="BoardsHomeWrapper__item__subContainer">
          <span
            className={`icon-lg icon-star${
              board.isStarred && !isHovering ? "-starred" : ""
            } BoardsHomeWrapper__item__subContainer--star${
              board.isStarred ? "Active" : ""
            }`}
            title={
              board.isStarred
                ? "Click to remove from starred list"
                : "Click to add to starred list"
            }
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              setBoardStarState({
                id: parseInt(board.id),
                starState: !board.isStarred,
              });
            }}
            style={{
              fontSize: "20px",
              color: board.isStarred ? "#f2d600" : "#fff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

HomeBoardItem.propTypes = {
  board: propTypes.object.isRequired,
};

import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useState } from "react";
import SmallContentEditable from "../../../../../../../Components/SmallContentEditable/SmallContentEditable";
import { ControlIconsDefinitions } from "../../../../../../../Assets/Font/IconMap";

export default function HomeBoardItem({ board }) {
  const setSelectedBoard = useStoreActions((action) => action.setSelectedBoard);
  const setBoardStarState = useStoreActions(
    (action) => action.setBoardStarState
  );
  const setSelectedBoardTitle = useStoreActions(
    (action) => action.setSelectedBoardTitle
  );

  const deleteBoard = useStoreActions((action) => action.deleteBoard);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link
      className="BoardsHomeWrapper__item"
      id={board.id}
      onClick={(e) => {
        if (e.target.className.includes("BoardsHomeWrapper__item--pseudo")) {
          setSelectedBoard(parseInt(board.id));
        } else {
          e.preventDefault();
        }
      }}
      to={`/app/dashboard/boards/${board.id}`}
      style={{
        backgroundImage: `url(${board.backgroundImage}?w=245&h=155&auto=format)`,
        backgroundSize: "cover",
      }}
    >
      <div className="BoardsHomeWrapper__item--pseudo">
        <div className="BoardsHomeWrapper__item__title">
          <SmallContentEditable
            html={board.title}
            setOptionalEllipsis={() => {}}
            setNewValue={(newValue) => {
              setSelectedBoardTitle({
                id: board.id,
                title: newValue,
              });
            }}
            style={{ color: "white", width: "100%", maxWidth: "305px" }}
            data-bordercolor="white"
          />
        </div>
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
          <span
            className={`controlIcons BoardsHomeWrapper__item__subContainer--bin BoardsHomeWrapper__item__subContainer--bin--translate`}
            style={{ marginRight: board.isStarred ? "-26px" : "" }}
            title="Delete this board"
            onClick={() => {
              deleteBoard(parseInt(board.id));
            }}
          >
            {ControlIconsDefinitions.Delete}
          </span>
        </div>
      </div>
    </Link>
  );
}

HomeBoardItem.propTypes = {
  board: propTypes.object.isRequired,
};

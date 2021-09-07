import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./BoardSelecter.scss";
import { useAuth } from "../../../../hooks/useAuth";
import firebase from "firebase";

function BoardSelecter({
  boardDetails,
  setCurrentBoard,
  allBoardDetails,
  setAllBoardDetails,
  setSyncState,
}) {
  const { setPageDetails, currentBoard, userState } = useAuth();
  // const [optionsState, setOptionsState] = useState(false);
  // const optionsRef = useRef();
  // Ranchero0123
  return (
    <div
      className={`BoardSelecterWrapper ${
        currentBoard.boardId === boardDetails.boardId
          ? "BoardSelecterWrapper--current"
          : ""
      }`}
    >
      <div
        className="BoardSelecterWrapper__Content"
        onClick={() => {
          setCurrentBoard(boardDetails);
          setPageDetails(boardDetails.blocks);
        }}
      >
        {boardDetails.boardTitle === ""
          ? "Untitled"
          : boardDetails.boardTitle
              .replaceAll("&nbsp;", " ")
              .replaceAll("<div><br></div>", " ")
              .replaceAll("<br>", " ")}
      </div>
      {allBoardDetails.length !== 1 && (
        <div
          className="BoardSelecterWrapper__optionsToggle"
          onClick={() => {
            const boardsList = [...allBoardDetails];
            if (boardsList.indexOf(boardDetails) > -1) {
              boardsList.splice(boardsList.indexOf(boardDetails), 1);
              setAllBoardDetails(boardsList);
              setSyncState(false);

              if (userState) {
                firebase
                  .database()
                  .ref(userState.uid)
                  .set(allBoardDetails)
                  .then(() => {
                    setSyncState(true);
                  });
              }
            }
            // console.log(boardsList.indexOf(boardDetails))
            // setOptionsState(!optionsState);
          }}
        >
          <svg viewBox="0 0 30 30" className="trash">
            <path d="M21,5c0-2.2-1.8-4-4-4h-4c-2.2,0-4,1.8-4,4H2v2h2v22h22V7h2V5H21z M13,3h4c1.104,0,2,0.897,2,2h-8C11,3.897,11.897,3,13,3zM24,27H6V7h18V27z M16,11h-2v12h2V11z M20,11h-2v12h2V11z M12,11h-2v12h2V11z"></path>
          </svg>
          {/* <svg viewBox="0 0 13 3" className="dots">
          <g>
            <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
            <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
            <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
          </g>
        </svg> */}
        </div>
      )}

      {/* {optionsState && <SelectorOptions />} */}
    </div>
  );
}

BoardSelecter.propTypes = {
  boardDetails: PropTypes.object.isRequired,
};

BoardSelecter.defaultProps = {};

export default BoardSelecter;

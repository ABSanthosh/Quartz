import React from "react";
import PropTypes from "prop-types";
import "./BoardSelecter.scss";
import { useAuth } from "../../../../hooks/useAuth";

function BoardSelecter({ boardDetails, setCurrentBoard }) {
  const { setPageDetails } = useAuth();

  return (
    <div
      className="BoardSelecterWrapper"
      onClick={() => {
        setCurrentBoard(boardDetails);
        setPageDetails(boardDetails.blocks);
      }}
    >
      <div className="BoardSelecterWrapper__Content">
        {boardDetails.boardTitle === "" ? "Untitled" : boardDetails.boardTitle}
      </div>
      <div className="BoardSelecterWrapper__optionsToggle">
        <svg viewBox="0 0 13 3" className="dots">
          <g>
            <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
            <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
            <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
          </g>
        </svg>
      </div>
    </div>
  );
}

BoardSelecter.propTypes = {
  boardDetails: PropTypes.object.isRequired,
};

BoardSelecter.defaultProps = {};

export default BoardSelecter;

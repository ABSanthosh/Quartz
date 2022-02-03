import React from "react";
import { useParams } from "react-router-dom";
import "./BoardsContainer.scss";
import BoardEditor from "./Components/BoardEditor/BoardEditor";
import BoardsHome from "./Components/BoardsHome/BoardsHome";

function BoardsContainer({ navState }) {
  const { mode, modeId } = useParams();

  return (
    <>
      {modeId === undefined && <BoardsHome navState={navState} />}
      {modeId && <BoardEditor navState={navState} />}
    </>
  );
}

BoardsContainer.propTypes = {
  // bla: PropTypes.string,
};

BoardsContainer.defaultProps = {
  // bla: 'test',
};

export default BoardsContainer;

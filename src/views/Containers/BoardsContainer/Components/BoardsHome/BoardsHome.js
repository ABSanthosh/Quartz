import React from "react";
import PropTypes from "prop-types";
import "./BoardsHome.scss";
import { useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";

function BoardsHome({ navState }) {
  const boards = useStoreState((state) => state.boards);
  let history = useHistory();

  return (
    <>
      <div className="DashboardWrapper__subHeader">
        <div
          className={`DashboardWrapper__subHeader--left ${
            navState ? "DashboardWrapper__subHeader--left--open" : ""
          }`}
        >
          <p>Boards</p>
        </div>
        <div className="DashboardWrapper__subHeader--right"></div>
      </div>
      <div className="BoardsHomeWrapper">
        <div className="BoardsHomeWrapper__top"></div>
        <div className="BoardsHomeWrapper__bottom">
          {boards.map((board, index) => (
            <div
              className="BoardsHomeWrapper__item"
              key={index}
              onClick={() => {
                history.push(`/app/dashboard/boards/${board.id}`);
              }}
            >
              <div className="BoardsHomeWrapper__item__title">
                {board.title}
                <br />
                {board.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

BoardsHome.propTypes = {
  navState: PropTypes.bool.isRequired,
};

BoardsHome.defaultProps = {};

export default BoardsHome;

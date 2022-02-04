import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./BoardsHome.scss";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";
import paperEffect from "../../../../../Assets/Img/paperEffect.png";

function BoardsHome({ navState }) {
  const boards = useStoreState((state) => state.boards);
  let history = useHistory();
  const setSelectedBoard = useStoreActions((action) => action.setSelectedBoard);

  useEffect(() => {
    console.log(
      document.querySelector(".DashboardWrapper__frame ").style.backgroundImage,
      paperEffect
    );
    document.querySelector(
      ".DashboardWrapper__frame "
    ).style.backgroundImage = `url(${paperEffect})`;
    // document.querySelector(".DashboardWrapper__frame ").style.backgroundSize =
    //   "cover";

    // document.querySelector(
    //   ".DashboardWrapper__frame "
    // ).style.backgroundPosition = "50%";

    // document.querySelector(".DashboardWrapper__frame ").style.backgroundRepeat =
    //   "no-repeat";
  });

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
                setSelectedBoard(parseInt(board.id));
                history.push(`/app/dashboard/boards/${board.id}`);
              }}
              style={{
                backgroundImage: `url(${board.backgroundImage})`,
                backgroundSize: "cover",
              }}
            >
              <div className="BoardsHomeWrapper__item--pseudo">
                <div className="BoardsHomeWrapper__item__title">
                  {board.title}
                  <br />
                  {board.id}
                </div>
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

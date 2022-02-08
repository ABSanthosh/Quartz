import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./BoardsHome.scss";
import { useStoreActions, useStoreState } from "easy-peasy";
import paperEffect from "../../../../../Assets/Img/paperEffect.png";
import HomeBoardItem from "./Components/HomeBoardItem/HomeBoardItem";

function BoardsHome({ navState }) {
  const boards = useStoreState((state) => state.boards);
  const addBoard = useStoreActions((actions) => actions.addBoard);

  const cacheImages = async (imageArray) => {
    const imagePromises = imageArray.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = image;
        img.onload = resolve;
      });
    });
    await Promise.all(imagePromises);
  };

  useEffect(() => {
    const imageArray = boards.map(
      (board) => board.backgroundImage + "?auto=format"
    );
    imageArray.push(paperEffect);
    cacheImages(imageArray);
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
        {/* <div className="BoardsHomeWrapper__top"></div> */}
        <div className="BoardsHomeWrapper__bottom">
          {boards.some((board) => board.isStarred) && (
            <div className="BoardsHomeWrapper__workSpace">
              <div className="BoardsHomeWrapper__workSpace--title">
                <span className="BoardsHomeWrapper__workSpace--title--subContainer">
                  <span
                    className="icon-lg icon-star"
                    style={{ color: "#9c6271", fontSize: "30px" }}
                  />
                  <p>Starred Boards</p>
                </span>
              </div>
              <div className="BoardsHomeWrapper__workSpace--content">
                {boards.map((board, index) => {
                  if (board.isStarred) {
                    return <HomeBoardItem key={index} board={board} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          )}
          <div className="BoardsHomeWrapper__workSpace">
            <div className="BoardsHomeWrapper__workSpace--title">
              <p>Your workspace</p>
            </div>
            <div className="BoardsHomeWrapper__workSpace--content">
              {boards.map((board, index) => {
                if (!board.isStarred) {
                  return <HomeBoardItem key={board.id} board={board} />;
                } else {
                  return null;
                }
              })}
              <div
                className="BoardsHomeWrapper__item BoardsHomeWrapper__item--addBoard"
                onClick={() => {
                  addBoard({});
                }}
              >
                Create new board
              </div>
            </div>
          </div>
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

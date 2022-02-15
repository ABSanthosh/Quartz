import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./BoardsHome.scss";
import { useStoreState } from "easy-peasy";
import paperEffect from "../../../../../Assets/Img/paperEffect.png";
import HomeBoardItem from "./Components/HomeBoardItem/HomeBoardItem";
import Modal from "../../../../../Components/Modal/Modal";
import HomeModalDialog from "./Components/HomeModalDialog/HomeModalDialog";

function BoardsHome({ navState }) {
  const boards = useStoreState((state) => state.boards);
  const [openModal, setOpenModal] = useState(false);

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
      (board) =>
        `${board.backgroundImage}?auto=format&h=${window.screen.height}&fit=max)`
    );
    imageArray.push(paperEffect);
    cacheImages(imageArray);
  });

  // function lum(r, b, g) {
  //   const lum = r * 0.2126 + g * 0.7152 + b * 0.0722;
  //   return { lum, fg: lum < 140 ? "#fff" : "#000" };
  // }

  return (
    <>
      {openModal && (
        <Modal>
          <HomeModalDialog closeDialog={setOpenModal} />
        </Modal>
      )}
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
                  // addBoard({});
                  setOpenModal(true);
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

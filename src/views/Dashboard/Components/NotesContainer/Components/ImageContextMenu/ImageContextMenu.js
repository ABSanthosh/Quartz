import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./ImageContextMenu.scss";
import FancySlider from "../../../../../../Components/FancySlider/FancySlider";
import { ControlIconsDefinitions } from "../../../../../../Assets/Font/IconMap";

function ImageContextMenu({
  imageElement,
  setImageContextMenu,
  data,
  setSelectedNoteContent,
}) {
  const [heightState, setHeightState] = useState(imageElement.height);
  const [widthState, setWidthState] = useState(imageElement.width);
  const [isAspectRatio, setIsAspectRatio] = useState(true);
  const imageRef = useRef();

  const isDescendant = function (child) {
    return (
      child.classList[0].includes("ImageContextMenuWrapper") ||
      child.classList[0].includes("FancySliderWrapper")
    );
  };

  const saveContent = () => {
    setSelectedNoteContent({
      id: data.id,
      content: document.querySelector(
        ".StickyNoteWrapper__content--editableContent"
      ).innerHTML,
      sanitizedContent: document.querySelector(
        ".StickyNoteWrapper__content--editableContent"
      ).innerText,
    });
  };

  useEffect(() => {
    imageElement.style.height = heightState + "px";
    saveContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightState]);

  useEffect(() => {
    imageElement.style.width = widthState + "px";
    saveContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthState]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  function handleClick({ target }) {
    try {
      if (!isDescendant(target)) {
        setImageContextMenu(false);
      }
    } catch (e) {
      setImageContextMenu(false);
    }
  }

  return (
    <div className="ImageContextMenuWrapper" ref={imageRef}>
      <div
        className={`ImageContextMenuWrapper__Item ${
          isAspectRatio ? "ImageContextMenuWrapper__Item--active" : ""
        } `}
        onClick={() => {
          setIsAspectRatio(!isAspectRatio);
        }}
      >
        <span className="ImageContextMenuWrapper__Item--subItem">
          <span className="controlIcons">{ControlIconsDefinitions.Link}</span>
          Aspect ratio
        </span>
      </div>
      <div className="ImageContextMenuWrapper__Item">
        Height
        <FancySlider
          min={0}
          defaultValue={imageElement.height}
          max={
            document.querySelector(
              ".StickyNoteWrapper__content--editableContent"
            ).clientHeight
          }
          onChange={(val) => {
            if (isAspectRatio) {
              const ratio = heightState / widthState;
              const aspectWidth = val / ratio;
              setHeightState(val);
              setWidthState(aspectWidth);
            } else {
              setHeightState(val);
            }
          }}
        />
      </div>
      <div className="ImageContextMenuWrapper__Item">
        Width
        <FancySlider
          min={0}
          defaultValue={imageElement.width}
          max={
            document.querySelector(
              ".StickyNoteWrapper__content--editableContent"
            ).clientWidth
          }
          onChange={(val) => {
            if (isAspectRatio) {
              const ratio = heightState / widthState;
              const aspectHeight = val * ratio;
              setWidthState(val);
              setHeightState(aspectHeight);
            } else {
              setWidthState(val);
            }
          }}
        />
      </div>
      <div
        className="ImageContextMenuWrapper__Item ImageContextMenuWrapper__Item--hover"
        onClick={() => {
          setHeightState(imageElement.getAttribute("default-height"));
          setWidthState(imageElement.getAttribute("default-width"));
        }}
      >
        Default size
      </div>
    </div>
  );
}

ImageContextMenu.propTypes = {
  imageElement: PropTypes.object.isRequired,
  setImageContextMenu: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setSelectedNoteContent: PropTypes.func.isRequired,
};

ImageContextMenu.defaultProps = {
  // bla: 'test',
};

export default ImageContextMenu;

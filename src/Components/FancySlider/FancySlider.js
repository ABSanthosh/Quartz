import React from "react";
import PropTypes from "prop-types";
//import { Test } from './FancySlider.styles';

function FancySlider({ min, max, defaultValue, onChange }) {
  return (
    <input
      className="FancySliderWrapper"
      type="range"
      max={max}
      min={min}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

FancySlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

FancySlider.defaultProps = {};

export default FancySlider;

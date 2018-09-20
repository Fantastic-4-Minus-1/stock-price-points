import React from 'react';
import PropTypes from 'prop-types';


const Bar = ({
  x, y, width, height, fillColor,
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={fillColor}
  />
);

// propTypes
Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fillColor: PropTypes.string.isRequired,
};

export default Bar;

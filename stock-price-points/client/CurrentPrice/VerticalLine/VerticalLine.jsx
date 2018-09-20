import React from 'react';
import PropTypes from 'prop-types';

const VerticalLine = ({ priceOnTheLine, upDownColor }) => (
  <line
    y1="-35"
    y2="110"
    x1={`${priceOnTheLine}`}
    x2={`${priceOnTheLine}`}
    fill={upDownColor}
    stroke={upDownColor}
  />
);

// propTypes
VerticalLine.propTypes = {
  upDownColor: PropTypes.string.isRequired,
  priceOnTheLine: PropTypes.number.isRequired,
};

export default VerticalLine;

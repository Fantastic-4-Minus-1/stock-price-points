import React from 'react';
import PropTypes from 'prop-types';
import PriceBall from './PriceBall/PriceBall.jsx';
import VerticalLine from './VerticalLine/VerticalLine.jsx';

const CurrentPrice = ({ priceOnTheLine, upDownColor }) => (
  <g id="priceOnTheLine">
    <VerticalLine
      upDownColor={upDownColor}
      priceOnTheLine={priceOnTheLine}
    />
    <PriceBall
      upDownColor={upDownColor}
      priceOnTheLine={priceOnTheLine}
    />
  </g>
);

// propTypes
CurrentPrice.propTypes = {
  upDownColor: PropTypes.string.isRequired,
  priceOnTheLine: PropTypes.number.isRequired,
};

export default CurrentPrice;

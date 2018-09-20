import React from 'react';
import PropTypes from 'prop-types';
import { LowestPrice, AveragePrice, HighestPrice } from './TextDivs/TextDivs.jsx';

const YearlyText = ({ yearly, averageOnTheLine, marketIsOpen }) => (
  <div className="prices-container">
    <LowestPrice
      marketIsOpen={marketIsOpen}
      yearly={yearly}
    />
    <AveragePrice
      marketIsOpen={marketIsOpen}
      averageOnTheLine={averageOnTheLine}
      yearly={yearly}
    />
    <HighestPrice
      marketIsOpen={marketIsOpen}
      yearly={yearly}
    />
  </div>
);

// propTypes
YearlyText.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
  averageOnTheLine: PropTypes.number.isRequired,
  yearly: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default YearlyText;

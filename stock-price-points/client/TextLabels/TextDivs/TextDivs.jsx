import React from 'react';
import PropTypes from 'prop-types';

export const LowestPrice = ({ yearly, marketIsOpen }) => {
  const { yearLowest } = yearly;
  const color = marketIsOpen ? '#cbcbcd' : '#8c8d8d';
  const lowTextStyle = {
    textAlign: 'left',
    color,
  };

  return (
    <div className="low-text" style={lowTextStyle}>
      <div>
        52 Week Low
      </div>
      <div className="dollar-amount">
        {`$${yearLowest}`}
      </div>
    </div>
  );
};

export const AveragePrice = ({ yearly, averageOnTheLine, marketIsOpen }) => {
  const { yearAverage } = yearly;

  const valToTransform = averageOnTheLine - 96.56 - 55;
  const color = marketIsOpen ? '#171718' : '#FFFFFF';

  const innerAverage = {
    width: '110px',
    transform: `translateX(${valToTransform}px)`,
    textAlign: 'center',
    fontWeight: '600',
    color,
  };

  return (
    <div className="average-text">
      <div className="inner-average" style={innerAverage}>
        <div>
          Average Price
          <br />
          Paid
        </div>
        <div className="dollar-amount">
          {`$${yearAverage}`}
        </div>
      </div>
    </div>
  );
};

export const HighestPrice = ({ yearly, marketIsOpen }) => {
  const { yearHighest } = yearly;
  const color = marketIsOpen ? '#cbcbcd' : '#8c8d8d';
  const highTextStyle = {
    textAlign: 'right',
    color,
  };
  return (
    <div className="high-text" style={highTextStyle}>
      <div>
        52 Week High
      </div>
      <div className="dollar-amount">
        {`$${yearHighest}`}
      </div>
    </div>
  );
};

// propTypes
LowestPrice.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
  yearly: PropTypes.objectOf(PropTypes.number).isRequired,
};
AveragePrice.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
  averageOnTheLine: PropTypes.number.isRequired,
  yearly: PropTypes.objectOf(PropTypes.number).isRequired,
};
HighestPrice.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
  yearly: PropTypes.objectOf(PropTypes.number).isRequired,
};

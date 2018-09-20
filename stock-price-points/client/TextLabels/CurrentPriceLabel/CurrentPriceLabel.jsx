import React from 'react';
import PropTypes from 'prop-types';

const CurrentPriceLabel = (
  {
    priceOnTheLine,
    percentChange,
    upDownColor,
  },
) => {
  const currPriceToTransform = priceOnTheLine - 45;
  const currentPriceContainer = {
    width: '90px',
    fontSize: '15px',
    color: upDownColor,
    transform: `translateX(${currPriceToTransform}px)`,
  };

  const highLowLabel = percentChange > 0 ? 'Higher' : 'Lower';
  return (
    <header className="label-header">
      <div className="currentPriceContainer" style={currentPriceContainer}>
        <p>
          {`${Math.floor(Math.abs(percentChange))}% ${highLowLabel} `}
          <span className="right-now">
            Right Now
          </span>
        </p>
      </div>
    </header>
  );
};

// propTypes
CurrentPriceLabel.propTypes = {
  priceOnTheLine: PropTypes.number.isRequired,
  percentChange: PropTypes.number.isRequired,
  upDownColor: PropTypes.string.isRequired,
};

export default CurrentPriceLabel;

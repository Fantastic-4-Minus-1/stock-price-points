import React from 'react';
import PropTypes from 'prop-types';

const PricesPaidHeader = ({ marketIsOpen }) => {
  const classNames = marketIsOpen ? 'main-header' : 'main-header is-open-header';
  const pricesPaidHeader = {
    borderTopStyle: 'solid !important',
    borderRightStyle: 'solid !important',
    borderBottomStyle: 'solid !important',
    borderLeftStyle: 'solid !important',
    borderTopColor: '#0e0d0d !important',
    borderRightColor: '#0e0d0d !important',
    borderBottomColor: '#0e0d0d !important',
    borderLeftColor: '#0e0d0d !important',
    backgroundColor: '#0e0d0d !important',
  };

  return (
    <div className={classNames}>
      <h2> Price Paid on Robinhood</h2>
      <hr color="#0e0d0d !important" size="1 !important" style={pricesPaidHeader} />
    </div>
  );
};

// propTypes
PricesPaidHeader.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
};

export default PricesPaidHeader;

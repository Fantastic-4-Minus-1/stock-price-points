import React from 'react';
import PropTypes from 'prop-types';

const Line = ({ marketIsOpen }) => {
  const fillColor = marketIsOpen ? '#cbcdcd' : '#8c8c8e';
  return (
    <line x1="0" x2="676" y1="114" y2="114" stroke={fillColor} fill="#cbcbcd" />
  );
};

// propTypes
Line.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
};

export default Line;

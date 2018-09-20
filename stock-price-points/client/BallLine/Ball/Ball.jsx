import React from 'react';
import PropTypes from 'prop-types';

const Ball = ({ averageOnTheLine }) => {
  // change fill color to visualize Average on the line
  const fillColor = 'none';
  return (
    <circle
      cx={`${averageOnTheLine}`}
      cy="110"
      r="7"
      fill={fillColor}
    />
  );
};

// propTypes
Ball.propTypes = {
  averageOnTheLine: PropTypes.number.isRequired,
};

export default Ball;

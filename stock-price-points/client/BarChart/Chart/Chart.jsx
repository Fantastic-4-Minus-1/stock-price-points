import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({ children, width, height }) => (
  <div>
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height + 60}
    >
      <g>
        {children}
      </g>
    </svg>
  </div>
);

// propTypes
Chart.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Chart;

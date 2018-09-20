import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Analyst = ({ tooltip, display }) => (
  <div>
    <p data-tip={tooltip}>
      <span className="badges">
        <i className="fas fa-tag" />
        {display}
      </span>
    </p>
    <ReactTooltip
      className="tooltip"
      place="bottom"
      type="dark"
      effect="solid"
    />
  </div>
);

Analyst.propTypes = {
  tooltip: PropTypes.number.isRequired,
  display: PropTypes.number.isRequired,
};

export default Analyst;

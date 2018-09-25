
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Analyst = ({ tooltip, display, marketisOpen }) => (
  <div className={marketisOpen ? 'robinhood-is-open' : 'robinhood-is-closed'}>
    <p className="transparent" data-tip={tooltip}>
      <span className={`badges ${marketisOpen ? 'robinhood-is-open' : 'robinhood-is-closed'}`}>
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
  marketisOpen: PropTypes.bool.isRequired,
};

export default Analyst;

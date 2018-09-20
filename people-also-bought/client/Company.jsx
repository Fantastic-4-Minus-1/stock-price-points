import React from 'react';
import PropTypes from 'prop-types';
import Analyst from './Analyst.jsx';

const Company = ({
  currentPercentages,
  company,
  price,
}) => (
  <div className="flex-item">
    <div className="company-title">{company.company}</div>
    <div className="analyst">
      <Analyst
        display={`${company.percentage}%`}
        tooltip={`${company.percentage}% anaylsts agree that
        ${company.company} is a buy.`}
      />
    </div>
    <div className="price">
      {`$${price}`}
    </div>
    <span className="differences">{currentPercentages}</span>
  </div>
);

Company.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    group: PropTypes.number,
    percentage: PropTypes.number,
    currentDay: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  price: PropTypes.number.isRequired,
  currentPercentages: PropTypes.number.isRequired,
};

export default Company;

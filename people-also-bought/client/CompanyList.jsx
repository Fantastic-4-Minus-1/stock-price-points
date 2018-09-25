import React from 'react';
import PropTypes from 'prop-types';
import Company from './Company.jsx';


const CompanyList = ({
  companies,
  currentPrices,
  currentPercentages,
  handleArrowClick,
  marketisOpen,
  showLeft,
  showRight,
}) => (
  <div className={marketisOpen ? 'robinhood-open-up' : 'robinhood-closed-down'}>
    <div className="flex-container">
      <div className={`clickers ${showLeft ? 'visible' : null}`}>
        <a href onClick={handleArrowClick} className="leftArrow"><i name="left" className="fas fa-angle-left" /></a>
      </div>
      {companies.map((company, index) => (
        <Company
          company={company}
          price={currentPrices[index]}
          currentPercentage={currentPercentages[index]}
          marketisOpen={marketisOpen}
        />
      ))}
      <div className={`clickers ${showRight ? 'visible' : null}`}>
        <a href onClick={handleArrowClick} className="rightArrow"><i name="right" className="fas fa-angle-right" /></a>
      </div>
    </div>
  </div>
);


export default CompanyList;

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleArrowClick: PropTypes.func.isRequired,
  marketisOpen: PropTypes.bool.isRequired,
  showLeft: PropTypes.bool.isRequired,
  showRight: PropTypes.bool.isRequired,
  currentPercentages: PropTypes.number.isRequired,

};

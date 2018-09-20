import React from 'react';
import CountUp from 'react-countup';

import './GraphHeader.css';

//Components
import Tabs from './Tab.jsx';

const GraphHeaderContainer = props => {
  return (
    <div className="uk-column-1-2">
      {props.company_name ? (
        <div>
          <div
            className={
              props.marketIsOpen ? 'theme-open-up' : 'theme-closed-down'
            }
          >
            <h1
              className={`uk-heading-primary ${
                props.marketIsOpen ? 'theme-open-up' : 'theme-closed-down'
              }`}
            >
              {props.company_name}
              <br />
              <span
                className={`money-title ${
                  props.marketIsOpen ? 'theme-open-up' : 'theme-closed-down'
                }`}
              >
                $
                <CountUp
                  decimals="2"
                  start={props.lastPrice}
                  end={props.currentPrice}
                  duration={2}
                />
              </span>
            </h1>
          </div>
          <div>
            <ul>
              <Tabs
                marketIsOpen={props.marketIsOpen}
                icon="user"
                display={props.owners.toLocaleString('en')}
                tooltip={`${props.owners.toLocaleString('en')} people own ${
                  props.company_name
                } on Robinhood.`}
              />
              <Tabs
                marketIsOpen={props.marketIsOpen}
                icon="tag"
                display={`${props.percent}%`}
                tooltip={`${props.percent}% anaylsts agree that 
                  ${props.company_name} is a buy.`}
              />
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GraphHeaderContainer;

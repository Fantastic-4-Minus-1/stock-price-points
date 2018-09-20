import React from 'react';
import './Tab.css';
import Icon from '../Misc/Icon.jsx';
import ReactTooltip from 'react-tooltip';

const Tabs = props => {
  return (
    <li className="uk-align-right">
      <a data-tip={props.tooltip}>
        <span
          className={`uk-badge ${
            props.marketIsOpen ? 'bottom-badges' : 'market-close'
          }`}
        >
          <Icon icon={props.icon} /> {props.display}
        </span>
      </a>
      <ReactTooltip
        className="tooltip"
        place="bottom"
        type="dark"
        effect="solid"
      />
    </li>
  );
};

export default Tabs;

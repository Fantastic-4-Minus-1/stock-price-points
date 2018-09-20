import React, { Component } from 'react';
import './Header.css';

const Header = props => {
  let showClass = null;
  if (props.marketIsOpen && props.marketIsUp) {
    showClass = 'open-market-up';
  } else if (!props.marketIsOpen && props.marketIsUp) {
    showClass = 'close-market-up';
  } else if (!props.marketIsOpen && !props.marketIsUp) {
    showClass = 'close-market-down';
  } else {
    showClass = 'open-market-down';
  }

  return (
    <div>
      <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar={true}>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <a href="">
                <span className={`uk-badge my-badges ${showClass}`}>
                  Computer Hardware
                </span>
              </a>
            </li>
            <li>
              <a href="">
                <span className={`uk-badge my-badges ${showClass}`}>
                  100 Most Popular
                </span>
              </a>
            </li>
            <li>
              <a href="">
                <span className={`uk-badge my-badges ${showClass}`}>
                  Computer Software
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

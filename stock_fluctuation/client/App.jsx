// /* global document */
import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';
import flatten from 'lodash/flatten';

// css
import './App.css';

// Components
import Header from './components/header/Header.jsx';
import GraphHeaderContainer from './components/graphHeader/GraphHeaderContainer.jsx';
import Graph from './components/graph/Graph.jsx';
import Footer from './components/footer/Footer.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      company: {},
      allTicks: [],
      currentTicks: [],
      timeTicks: [],
      nextTicks: [],
      startingPrice: null,
      marketIsUp: true,
      marketIsOpen: true,
      showDay: true,
      currentPrice: null,
      lastPrice: null,
      newPrice: null,
      showMonth: false,
      showWeek: false,
    };

    this.allTicks = this.allTicks.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.changeTimeLimit = this.changeTimeLimit.bind(this);
    this.transformDayTicks = this.transformDayTicks.bind(this);
    this.updateTicks = this.updateTicks.bind(this);
    this.checkMarketValue = this.checkMarketValue.bind(this);
    this.transformWeekTicks = this.transformWeekTicks.bind(this);
    this.transformMonthTicks = this.transformMonthTicks.bind(this);
    this.checkTime = this.checkTime.bind(this);
  }

  checkTime() {
    // Check time for app theme
    const time = moment();
    const beforeTime = moment('06:00', 'hh:mm');
    const afterTime = moment('15:00', 'hh:mm');

    if (time.isBetween(beforeTime, afterTime)) {
      this.setState({ marketIsOpen: true });
    } else {
      this.setState({ marketIsOpen: false });
    }
  }

  componentDidMount() {
    this.checkTime();
    setInterval(() => this.checkTime(), 1000);

    axios
      .get(`/api/graph${window.location.pathname}`)
      .then(res => res.data)
      .then((data) => {
        const company = data[0];
        this.allTicks(company.tickers);
        this.setState({ companies: data, company });
      });
  }

  allTicks(tickers) {
    const allTicks = tickers.filter((ticker) => {
      if (moment(ticker.date).isBefore(moment())) {
        return ticker;
      }
    });
    // todays ticks
    const todayTicks = this.transformDayTicks([allTicks.pop()]);
    // ticks up to the time right now
    const currentTicks = todayTicks.filter((tick) => {
      if (moment(tick.dateTime).isBefore(moment())) {
        return tick;
      }
    });
    // the rest of the ticks for the day
    const nextTicks = todayTicks.filter((tick) => {
      if (moment(tick.dateTime).isAfter(moment())) {
        return tick;
      }
    });
    // starting price starts at today's open market value
    const startingPrice = currentTicks[0].price;
    // same for last and current when app opens up
    const lastPrice = currentTicks[currentTicks.length - 1].price;
    const currentPrice = currentTicks[currentTicks.length - 1].price;
    // set intialState when component mounts
    this.setState({
      allTicks,
      currentTicks,
      nextTicks,
      startingPrice,
      lastPrice,
      currentPrice,
    });
    this.checkMarketValue();
    this.updateTicks();
  }

  updateTicks() {
    if (this.state.nextTicks.length === 0) return;
    const update = setInterval(() => {
      const nextTicks = this.state.nextTicks;
      const nextTick = nextTicks.shift();
      const currentPrice = nextTick.price;
      const lastPrice = this.state.currentTicks[
        this.state.currentTicks.length - 1
      ].price;
      const currentTicks = [...this.state.currentTicks, nextTick];
      this.setState({
 currentTicks, nextTicks, lastPrice, currentPrice 
});
      // check market price
      this.checkMarketValue();

      // stop interval when ticks run out
      if (this.state.nextTicks.length === 0) {
        clearInterval(update);
      }
    }, 10000);
  }

  transformDayTicks(tickers) {
    const array = flatten(
      tickers.map((ticker) => {
        const dateStr = ticker.date.slice(0, 10);
        const date = moment(dateStr, 'YYYY-MM-DD');
        return ticker.price.map((ticks, index) => {
          const dateTime = moment(`${dateStr  } ${  ticks.currentTime}`);
          let time = moment(dateTime).format('HH:mm');
          time = time.split(':').join('');
          return {
            x: time,
            y: parseInt(ticks.currentPrice),
            dateTime,
            price: ticks.currentPrice,
          };
        });
      }),
    );
    return array;
  }

  transformWeekTicks(tickers) {
    let count = 0;
    const array = flatten(
      tickers.map((ticker) => {
        const dateStr = ticker.date.slice(0, 10);
        const date = moment(dateStr, 'YYYY-MM-DD');
        return ticker.price.map((ticks, index) => {
          const dateTime = moment(`${dateStr  } ${  ticks.currentTime}`);
          count += 0.5;
          return {
            x: count,
            y: parseInt(ticks.currentPrice),
            dateTime,
            price: ticks.currentPrice,
          };
        });
      }),
    );
    return array;
  }

  transformMonthTicks(tickers) {
    const array = flatten(
      tickers.map((ticker, index) => {
        const dateStr = ticker.date.slice(0, 10);
        const date = moment(dateStr, 'YYYY-MM-DD');
        const lastTick = ticker.price[ticker.price.length - 1];
        return {
          x: index + 1,
          y: parseInt(lastTick.currentPrice),
          dateTime: date,
          price: lastTick.currentPrice,
        };
      }),
    );
    return array;
  }

  checkMarketValue() {
    const { startingPrice, currentPrice } = this.state;
    if (parseInt(startingPrice) <= parseInt(currentPrice)) {
      this.setState({ marketIsUp: false });
    } else {
      this.setState({ marketIsUp: true });
    }
  }

  changeTimeLimit(period) {
    switch (period) {
      case 'day':
        this.updateTicks();
        return this.setState({
          showDay: true,
          showWeek: false,
          showMonth: false,
        });
      case 'week':
        clearInterval(this.updateTicks);
        return this.setState({
          showDay: false,
          showMonth: false,
          showWeek: true,
          timeTicks: this.transformWeekTicks(this.state.allTicks.slice(-5)),
        });
      case 'month':
        clearInterval(this.updateTicks);
        this.setState({
          showDay: false,
          showWeek: false,
          showMonth: true,
          timeTicks: this.transformMonthTicks(this.state.allTicks),
        });
        break;
      default:
        break;
    }
  }

  updatePrice(newPrice, show) {
    if (show && newPrice !== this.state.currentPrice) {
      this.setState({
        newPrice,
      });
    } else if (!show) {
      this.setState({
        newPrice: null,
      });
    }
  }

  render() {
    const { anaylst_percent, robinhood_owners, company } = this.state.company;
    const {
      currentPrice,
      currentTicks,
      allTicks,
      showDay,
      timeTicks,
      lastPrice,
      marketIsOpen,
      marketIsUp,
      newPrice,
      showWeek,
      showMonth,
    } = this.state;
    const tickers = showDay ? currentTicks : timeTicks;
    return (
      <div
        id="stockFlucuation"
        className={`uk-container-small ${
          marketIsOpen ? 'theme-open-up' : 'theme-closed-down'
        }`}
      >
        <Header marketIsUp={marketIsUp} marketIsOpen={marketIsOpen} />
        <GraphHeaderContainer
          percent={anaylst_percent}
          owners={robinhood_owners}
          company_name={company}
          currentPrice={newPrice || currentPrice}
          lastPrice={lastPrice}
          marketIsOpen={marketIsOpen}
        />
        <Graph
          allTicks={allTicks}
          currentTicks={tickers}
          onUpdatePrice={this.updatePrice}
          marketIsUp={marketIsUp}
          showDay={showDay}
          showWeek={showWeek}
          showMonth={showMonth}
        />
        <Footer
          marketIsOpen={marketIsOpen}
          marketIsUp={marketIsUp}
          changeTime={this.changeTimeLimit}
        />
      </div>
    );
  }
}

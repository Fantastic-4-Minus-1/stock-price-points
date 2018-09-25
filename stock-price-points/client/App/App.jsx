import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import BarChart from '../BarChart/BarChart.jsx';
import PricesPaidHeader from '../PricesPaidHeader/PricesPaidHeader.jsx';
import '../../public/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketIsOpen: false, // light/dark background styling
      priceIsUp: false, // green/orange component styling
      weeklyData: [
        {// Temporary Data to prevent errors.
          weekIndex: 1,
          weekHigh: 1,
          weekLow: 1,
          weekAverage: 1,
          weekStocksPurchased: 1,
        },
      ],
      yearly: {
        stocksPurchasedYear: 1,
        yearHighest: 1,
        yearLowest: 1,
        yearAverage: 1,
      },
      averageOnTheLine: 1,
      priceOnTheLine: 1,
      percentChange: 1,
    };

    this.componentDidMount = () => {
      this.getDataSetInitialState();
    };

    this.getDataSetInitialState = () => {
      axios.get(`/api/stockPricePoints${window.location.pathname}`)
        .then((output) => {
          console.log(output);
          console.log('stockPoints:', window.location.pathname);
          const { data } = output;
          const { yearly, currentPrice } = data[0];
          const { yearAverage, yearLowest, yearHighest } = yearly;
          // percentage Change Helper
          function percentageChange(valOne, valTwo) {
            return (((valTwo - valOne) / valOne) * 100);
          }
          // // Number On The Line Calculation
          function percentOfNumOnLine(amount) {
            const newRange = yearHighest - yearLowest;
            const newNum = amount - yearLowest;
            return (newNum / newRange);
          }

          const time = moment();
          const isOpen = moment('6:00', 'hh:mm');
          const isClosed = moment('15:00', 'hh:mm');

          const marketIsOpen = (time.isBetween(isOpen, isClosed));


          const averageOnTheLine = 676 * percentOfNumOnLine(yearAverage);
          const priceOnTheLine = 676 * percentOfNumOnLine(currentPrice[0]);
          const percentChange = percentageChange(yearAverage, currentPrice[0]);

          this.reloadStateData(currentPrice, yearAverage, yearLowest, yearHighest);

          this.setState({
            weeklyData: data[0].weeks.sort((a, b) => a.weekAverage - b.weekAverage),
            yearly,
            averageOnTheLine,
            priceOnTheLine,
            percentChange,
            marketIsOpen,
          });
        });
    };

    this.reloadStateData = (priceArray, yearAverage, yearLowest, yearHighest) => {
      const appScope = this;

      function percentageChange(valOne, valTwo) {
        return (((valTwo - valOne) / valOne) * 100);
      }
      // Number On The Line Calculation
      function percentOfNumOnLine(amount) {
        const newRange = yearHighest - yearLowest;
        const newNum = amount - yearLowest;
        return (newNum / newRange);
      }

      function theLoop(i) {
        setTimeout(() => {
          const time = moment();
          const isOpen = moment('9:00', 'hh:mm');
          const isClosed = moment('15:00', 'hh:mm');

          const marketIsOpen = (time.isBetween(isOpen, isClosed));

          const priceOnTheLine = 676 * percentOfNumOnLine(priceArray[i]);
          const percentChange = percentageChange(yearAverage, priceArray[i]);

          const priceIsUp = (percentChange > 0);
          appScope.setState({
            priceOnTheLine,
            percentChange,
            marketIsOpen,
            priceIsUp,
          });
          if (++i) {
            theLoop(i);
          }
        }, 3000);
      }
      theLoop(0);
    };
  }

  render() {
    const {
      marketIsOpen,
      priceIsUp,
      weeklyData,
      yearly,
      priceOnTheLine,
      averageOnTheLine,
      percentChange,
    } = this.state;

    const classNames = marketIsOpen ? 'main-div-open' : 'main-div-closed';
    return (
      <div className={classNames} id="stockPricePoints">
        <PricesPaidHeader
          marketIsOpen={marketIsOpen}
        />
        <BarChart
          marketIsOpen={marketIsOpen}
          priceIsUp={priceIsUp}
          weeklyData={weeklyData}
          priceOnTheLine={priceOnTheLine}
          averageOnTheLine={averageOnTheLine}
          percentChange={percentChange}
          yearly={yearly}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mainChart'));

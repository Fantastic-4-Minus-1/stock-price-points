import React from 'react';
import ReactDOM from 'react-dom';
import '../public/stylesheet.css';
import moment from 'moment';
import CompanyList from './CompanyList.jsx';

const axios = require('axios');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      currentCompanies: [],
      currentPrices: [],
      currentPercentages: [],
      min: 1,
      max: 8,
      priceisUp: true,
      marketisOpen: true,
      showRight: true,
      showLeft: false,
    };

    this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3003/people-also-bought', {
      params: {
        group: this.getRandomIntInclusive(1, 8),
      },
    })
      .then((res) => {
        this.setState({
          companies: res.data,
          currentCompanies: res.data.slice(0, 4),
        });
        this.updateData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRandomIntInclusive() {
    const { min } = this.state;
    const { max } = this.state;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateData() {
    const { currentCompanies } = this.state;
    const appScroll = this;

    function percentDiff(priceOne, priceTwo) {
      return (((priceTwo - priceOne) / priceOne) * 100);
    }

    function theLoop(i) {
      setTimeout(() => {
        const time = moment();
        const isOpen = moment('9:00', 'hh:mm');
        const isClosed = moment('15:00', 'hh:mm');
        const marketisOpen = (time.isBetween(isOpen, isClosed));

        appScroll.setState({
          currentPrices: [
            currentCompanies[0].currentDay[i].currentPrice,
            currentCompanies[1].currentDay[i].currentPrice,
            currentCompanies[2].currentDay[i].currentPrice,
            currentCompanies[3].currentDay[i].currentPrice,
          ],
          currentPercentages: [
            percentDiff(currentCompanies[0].currentDay[0].currentPrice,
              currentCompanies[0].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[1].currentDay[0].currentPrice,
              currentCompanies[1].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[2].currentDay[0].currentPrice,
              currentCompanies[2].currentDay[i].currentPrice).toFixed(2),
            percentDiff(currentCompanies[3].currentDay[0].currentPrice,
              currentCompanies[3].currentDay[i].currentPrice).toFixed(2),
          ],
          marketisOpen,
        });
        if (i++) {
          theLoop(i);
        }
      }, 300);
    }
    theLoop(1);
  }


  handleArrowClick(e) {
    const { showLeft, showRight, companies } = this.state;
    const arrow = e.target.getAttribute('name');
    if (!showLeft) {
      this.setState({
        showLeft: true,
        currentCompanies: companies.slice(4, 8),
      });
    } else if (!showRight) {
      this.setState({
        showRight: true,
        currentCompanies: companies.slice(4, 8),
      });
    } else if (arrow === 'left') {
      this.setState({
        showLeft: false,
        currentCompanies: companies.slice(0, 4),
      });
    } else {
      this.setState({
        showRight: false,
        currentCompanies: companies.slice(8, 12),
      });
    }
  }

  render() {
    const {
      currentPercentages,
      currentCompanies,
      currentPrices,
      marketisOpen,
      priceisUp,
      showRight,
      showLeft,
    } = this.state;

    return (
      <div id="peopleAlsoBought">
        <h1>People Also Bought</h1>
        <div>
          <CompanyList
            companies={currentCompanies}
            currentPrices={currentPrices}
            currentPercentages={currentPercentages}
            marketisOpen={marketisOpen}
            price={priceisUp}
            showRight={showRight}
            showLeft={showLeft}
            handleArrowClick={this.handleArrowClick}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('peopleAlsoBought'));

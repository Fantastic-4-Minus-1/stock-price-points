import React from "react";
import ReactDOM from "react-dom";
import StickyBox from 'react-sticky-box';
import DropDownMenu from './components/DropDownMenu/DropDownMenu.jsx';
import MarketOrder from './components/MarketOrder.jsx';
import LimitOrder from './components/LimitOrder.jsx';
import StopLossOrder from './components/StopLossOrder.jsx';
import StopLimitOrder from './components/StopLimitOrder.jsx';
import defaultData from './defaultData.js';
import axios from 'axios';
import moment from 'moment';
import "./openMarket.css";
import "./closedMarket.css";

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      view: 'Market',
      companyData: defaultData,
      watchList: 'add',
      showMenu: false,
      total: 0,
      currentPrice: defaultData[0].currentDay[0].currentPrice,
      marketOpen: true,
    };
    this.changeView = this.changeView.bind(this);
    this.changeWatch = this.changeWatch.bind(this);
    this.renderWatch = this.renderWatch.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/sidebar${window.location.pathname}`)
      .then(res => {
        const data = res.data;
        this.setState({
          companyData: data,
        });
        this.changeCurrentPrice()
      })
      .catch((err) => {
        console.log(err);
      });

  }

  changeCurrentPrice() {
    const {companyData, marketOpen} = this.state;
    const variable = this;
    function theLoop(i) {
      setTimeout(function() {
        const time = moment();
        const isOpen = moment('6:00', 'hh:mm');
        const isClosed = moment('15:00', 'hh:mm');
        const marketOpen = (time.isBetween(isOpen, isClosed));
        variable.setState({
          currentPrice: companyData[0].currentDay[i].currentPrice,
          marketOpen
        })
        if (++i) {
          theLoop(i);
        }
      }, 1000);
    };
    theLoop(0);
  }


  onChangeHandler(e) {
    const {companyData, currentPrice} = this.state;
    var results = eval(currentPrice * parseFloat(e.target.value));
    this.setState({
      total: results,
    })
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  changeWatch(option) {
    this.setState({
      watchList: option,
    });
  }

  renderWatch() {
    const {watchList, marketOpen} = this.state;
    const className = marketOpen ? 'Opened' : 'Closed';
    if (watchList === 'add') {
      return <button className={"watchList"+className} onClick={()=>{this.changeWatch('remove')}}> Add to Watchlist </button>
    } else {
      return <button className={"watchList"+className} onClick={()=>{this.changeWatch('add')}}> Remove from Watchlist </button>
    }
  }

  renderView() {
    const {view, companyData, showMenu, total, currentPrice, marketOpen} = this.state;
    if (view === 'Market') {
      return <MarketOrder 
        view={view} 
        companies={companyData} 
        renderWatch={this.renderWatch} 
        changeButton={this.changeButton} 
        showMenu={showMenu} total={total} 
        onChangeHandler={this.onChangeHandler} 
        currentPrice={currentPrice}
        marketOpen={marketOpen}
      />
    } else if (view === 'Limit') {
      return <LimitOrder 
        view={view} 
        companies={companyData} 
        renderWatch={this.renderWatch} 
        changeButton={this.changeButton} 
        showMenu={showMenu} total={total} 
        onChangeHandler={this.onChangeHandler}
        currentPrice={currentPrice}
        marketOpen={marketOpen}
      />
    } else if(view ==='Stop') {
      return <StopLossOrder 
        view={view} 
        companies={companyData} 
        renderWatch={this.renderWatch} 
        changeButton={this.changeButton} 
        showMenu={showMenu} total={total} 
        onChangeHandler={this.onChangeHandler}
        currentPrice={currentPrice}
        marketOpen={marketOpen}
      />
    } else {
      return <StopLimitOrder 
        view={view} 
        companies={companyData} 
        renderWatch={this.renderWatch} 
        changeButton={this.changeButton} 
        showMenu={showMenu} 
        total={total} 
        onChangeHandler={this.onChangeHandler}
        currentPrice={currentPrice}
        marketOpen={marketOpen}
      />
    }
  }


  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true });
  }

  closeMenu(event) {
    if (!this.slideDown.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  }

  changeButton() {
    const { showMenu, total, companyData, currentPrice, marketOpen } = this.state;
    const numOfShare = Math.floor(total / currentPrice);
    const className = marketOpen ? 'Opened' : 'Closed';
    if (total === 0 || NaN) {
      if (showMenu === false) {
        return (
          <div>
            <div className={"checkOut"+className}>
              {showMenu ? (<div
              className={"slideDown"+className}
              ref={(element) => {
              this.slideDown = element;
              }}>
                </div>
                ): (null)
              }
            </div>
            <button className={"button"+className} onClick={this.showMenu}> Review Order </button>
          </div>
          )
      } else {
        return (
          <div>
            <div className={"checkOut"+className}>
              {showMenu ? (<div
              className={"slideDown"+className}
              ref={(element) => {
              this.slideDown = element;
              }}>
                </div>
                ): (null)
              }
            </div>
            <div> Error </div>
            <div> Please enter a valid number of shares.</div><br></br><br></br>
            <button className={"button"+className} onClick={this.closeMenu}> Back </button>
          </div>)
        } 
    } else {
      if (showMenu === false) {
        return (
          <div>
            <div className={"checkOut"+className}>
              {showMenu ? (<div
              className={"slideDown"+className}
              ref={(element) => {
              this.slideDown = element;
              }}>
                </div>
                ): (null)
              }
            </div>
            <button className={"button"+className} onClick={this.showMenu}> Review Order </button>
          </div>)
      } else {
        return (
          <div>
            <div className={"checkOut"+className}>
              {showMenu ? (<div
              className={"slideDown"+className}
              ref={(element) => {
              this.slideDown = element;
              }}>
                </div>
                ): (null)
              }
            </div>
            <div> Not Enough Buying Power </div>
            <div>You don’t have enough buying power to buy {numOfShare} share of {companyData[0].company}. </div><br></br>
            <div>Please deposit ${(total * 1.05).toFixed(2)} to purchase {numOfShare} share at market price (5% collar included).</div><br></br>
            <div>Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers 
                 from spending more than they have in their Robinhood account. 
                 If you want to use your full buying power of $0.00 you can place a limit order instead.</div>
            <br></br>
            <button className={"button"+className}> Deposit ${parseFloat((total * 1.05).toFixed(2)) || "0.00"}</button>
            <button className={"backButton"+className} onClick={this.closeMenu}> Back </button>
          </div>
          )
      }       
    }
    
  }

  render() {
    const {marketOpen} = this.state;
    const className = marketOpen ? 'Opened' : 'Closed';
    return (
      <div className={"component-container"+className} id="navigationBar">
        <div className={"content-sidebar"+className}>
          <DropDownMenu handleClick={this.changeView} marketOpen={marketOpen}/>
          {this.renderView()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('navigationBar'));

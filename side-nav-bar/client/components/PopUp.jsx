import React from 'react';
import "../openMarket.css";
import "../closedMarket.css";

class PopUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
		}
	this.showMenu = this.showMenu.bind(this);
	this.closeMenu = this.closeMenu.bind(this);
	}

	showMenu(event) {
		event.preventDefault();
		this.setState({ showMenu: true}, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}

	closeMenu(event) {
		if (!this.dropdownMenu.contains(event.target)) {
			this.setState({ showMenu: false}, () => {
				document.removeEventListener('click', this.closeMenu);
			});
		}
	}

	render() {
		const {view, companies, marketOpen, currentPrice} = this.props;
		const className = marketOpen ? 'Opened' : 'Closed';
		return (
			<div>
				<div className={"popup"+className} onClick={this.showMenu}>
					<div className={"clickable"+className}> {view} Price</div>
				</div>
				{this.state.showMenu ? (
					<div
						className={"popup-menu"+className}
						ref={(element) => {
							this.dropdownMenu = element;
						}}>
						<header className={"popupHeader"+className}> The displayed price of ${currentPrice} is <br></br>
						the NASDAQ real-time last sale price. </header>
						<label className={"estimatedCost"+className}>
							<div>Last Sale</div>
							<span> ${currentPrice} x 400 </span>
						</label>
						<label className={"estimatedCost"+className}>
							<div>Bid</div>
							<span> ${currentPrice} x 400 </span>
						</label>
						<label className={"estimatedCost"+className}>
							<div>Ask</div>
							<span> ${currentPrice} x 400 </span>
						</label>
						<div className={"popupFooter"+className}> This is consolidated, real-time market information. </div>
					</div>
					): (null)
				}
			</div>
		);
	}
}

export default PopUp;
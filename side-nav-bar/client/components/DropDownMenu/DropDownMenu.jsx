import React from 'react';
import "./dropdownmenu.css";



class DropDownMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			view: 'market'
		}
	this.showMenu = this.showMenu.bind(this);
	this.closeMenu = this.closeMenu.bind(this);
	}

	showMenu(event) {
		event.preventDefault();
//dont want to be typing in document
		this.setState({ showMenu: true}, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}
//read documentation for setState in react docs
	closeMenu(event) {
		if (!this.dropdownMenu.contains(event.target)) {
			this.setState({ showMenu: false}, () => {
				document.removeEventListener('click', this.closeMenu);
			});
		}
	}

	render() {
		const {handleClick, marketOpen} = this.props;
		const className = marketOpen ? 'isOpened' : 'isClosed';
		return (
			<div>
				<div className={'menu-bar'+ " " + className} onClick={this.showMenu}>
				•••
				</div>

				{this.state.showMenu ? (<div
						className= {"mega-menu-content" + " " + className}
						ref={(element) => {
							this.dropdownMenu = element;
						}}>
						<header className={"heading" + " " + className}> Order Type </header>
						<p className={"menuP" + " " + className} onClick={() => {handleClick('Market'); this.closeMenu(false)}}> Market Order </p>
						<p className={"menuP" + " " + className} onClick={() => {handleClick('Limit'); this.closeMenu(false)}}> Limit Order </p>
						<p className={"menuP" + " " + className} onClick={() => {handleClick('Stop'); this.closeMenu(false)}}> Stop Loss Order </p>
						<p className={"menuP" + " " + className} onClick={() => {handleClick(' Limit'); this.closeMenu(false)}}> Stop Limit Order </p>
						<div className="dropdownfooter" > Get Free Options<br></br>Trading</div>
						</div>
					): (null)
				}
				</div>
			);
	}
}

export default DropDownMenu;
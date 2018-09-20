import React from 'react';
import PopUp from './PopUp.jsx';

const MarketOrder = (props) => {
	const {
		view,
		companies,
		renderWatch,
		showMenu,
		changeButton,
		total,
		onChangeHandler,
		currentPrice,
		marketOpen
	} = props;
	const className = marketOpen ? 'Opened' : 'Closed';
		return (
			<div>
				<div>
					<div className={"mainMenu"+className}>
						<header className={"header-class"+className}> Buy {companies[0].company}</header>
						<div className={"menuBody"+className}>
							<label>
								<div> Shares </div>
								<input 
									className={"orderInput"+className + " " + "input"+className} 
									min="0" 
									placeholder="0" 
									step="1" 
									name="quantity" 
									onChange={onChangeHandler}>
								</input>
							</label>

							<label>
								<PopUp
									view={view}
									companies={companies}
									marketOpen={marketOpen}
									currentPrice={currentPrice}/>
							<span> ${currentPrice} </span>
							</label>

							<label className={"estimatedCost"+className}>
								<div>Estimated Cost</div>
								<span> ${parseFloat((total).toFixed(2)) || "0.00"} </span>
							</label>
								{changeButton()}
						</div>
					</div>
					<div className={"footerclass"+className}> $0.00 Buying Power Available </div>
				</div>
				<div>
					{renderWatch()}
				</div>
			</div>
		)
	
}

export default MarketOrder;


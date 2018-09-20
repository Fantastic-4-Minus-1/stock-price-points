import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar/Bar.jsx';
import Chart from './Chart/Chart.jsx';
import BallLine from '../BallLine/BallLine.jsx';
import CurrentPrice from '../CurrentPrice/CurrentPrice.jsx';
import YearlyText from '../TextLabels/YearlyText.jsx';
import CurrentPriceLabel from '../TextLabels/CurrentPriceLabel/CurrentPriceLabel.jsx';

const BarChart = (
  {
    marketIsOpen,
    priceIsUp,
    weeklyData,
    yearly,
    priceOnTheLine,
    averageOnTheLine,
    percentChange,
  },
) => {
  // Width of each bar
  const itemWidth = 11.46;
  const itemMargin = 11.45;
  const dataLength = weeklyData.length;

  // find week with most stocks purchased
  let mostStocks = weeklyData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  // Reshape the data to the 96px-max-height proportions
  const resizedData = weeklyData.map(
    week => Object.assign(
      {},
      week,
      { weekStocksPurchased: week.weekStocksPurchased / (mostStocks / 96) },
    ),
  );

  // re-identify week with most stocks purchased after data-resize
  mostStocks = resizedData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  const chartHeight = mostStocks;
  const upDownColor = priceIsUp ? '#23CE99' : '#f45531';

  return (
    <div>
      <CurrentPriceLabel
        percentChange={percentChange}
        priceOnTheLine={priceOnTheLine}
        upDownColor={upDownColor}
      />
      <Chart
        width={dataLength * (itemWidth + itemMargin)}
        height={chartHeight}
      >
        {resizedData.map((week, index) => {
          const itemHeight = week.weekStocksPurchased;
          const xOnLine = index * (itemWidth + itemMargin);

          let filler = marketIsOpen ? '#F3F3F3' : '#0E0D0D';
          console.log('color', upDownColor);
          // Positive Percent Change
          if (percentChange > 0) {
            if ((xOnLine) >= (averageOnTheLine - 11) && (xOnLine + 11.45) < priceOnTheLine) {
              filler = upDownColor;
            }
          // Negative Percent Change
          } else if (percentChange < 0) {
            if ((xOnLine) <= (averageOnTheLine) && (xOnLine) > priceOnTheLine) {
              filler = upDownColor;
            }
          }
          return (
            <Bar
              x={index * (itemWidth + itemMargin)}
              y={chartHeight - itemHeight}
              width={itemWidth}
              height={itemHeight}
              fillColor={filler}
            />
          );
        })}
        <BallLine
          marketIsOpen={marketIsOpen}
          averageOnTheLine={averageOnTheLine}
        />
        <CurrentPrice
          upDownColor={upDownColor}
          priceOnTheLine={priceOnTheLine}
        />
      </Chart>
      <YearlyText
        marketIsOpen={marketIsOpen}
        averageOnTheLine={averageOnTheLine}
        yearly={yearly}
      />
    </div>
  );
};

BarChart.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
  priceIsUp: PropTypes.bool.isRequired,
  weeklyData: PropTypes.arrayOf(PropTypes.object).isRequired,
  averageOnTheLine: PropTypes.number.isRequired,
  priceOnTheLine: PropTypes.number.isRequired,
  percentChange: PropTypes.number.isRequired,
  yearly: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default BarChart;

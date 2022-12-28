import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import options from './options.js';
import helpers from '../../helpers.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController
);

const Draw = function({data}) {
  if (data.length === 0) {
    return;
  }

  const labels = function() {
    let labels = [];

    data.map(function(entry) {
      let date  = entry.date;
      let month = Number(date.slice(5, 7));
      let day   = Number(date.slice(8));

      let label = [day, helpers.toMonthName(month)];

      if (labels.indexOf(label) === -1) {
        labels.push(label);
      }
    })

    return labels;
  }();

  const tickers = function() {
    let tickers = {};

    data.map(function(entry) {
      if (!tickers[entry.ticker]) {
        tickers[entry.ticker] = [];
      }

      tickers[entry.ticker].push(entry);
    })

    return tickers;
  }();

  const prepData = function(type, set) {
    const prepped = [];

    let tickerData = tickers[set];

    labels.map(function(label, i) {
      if (!tickerData[i]) {
        return;
      }

      if (type === 'bar') {
        prepped.push([tickerData[i].open, tickerData[i].close]);
      } else {
        prepped.push(tickerData[i].open);
      }
    })

    return prepped;
  };

  const barData = {
    labels,
    datasets: function() {
      var sets = [];

      for (var ticker in tickers) {
        sets.push({data: prepData('bar', ticker)});
      }

      return sets;
    }()
  };

  const lineData = {
    labels,
    datasets: function() {
      var sets = [];

      for (var ticker in tickers) {
        sets.push({data: prepData('line', ticker)});
      }

      return sets;
    }()
  };

  var renderChart = function() {
    if (data.length > 60) {
      return <Line options={options.line} data={lineData}/>
    } else {
      return <Bar options={options.bar} data={barData}/>
    }
  };

  return (
    <div className='chartContainer'>
      {renderChart()}
    </div>
  )
}

export default Draw;
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
import ch from './ch.js';

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
  const tickers = ch.getTickers(data);
  const first   = Object.keys(tickers)[0];
  const labels  = ch.getLabels(tickers[first]);

  var renderChart = function() {
    if (data.length > 60 || Object.keys(tickers).length > 1) {
      return <Line options={options.line} data={ch.getDataForType('line', tickers, labels)}/>
    } else {
      return <Bar  options={options.bar}  data={ch.getDataForType('bar',  tickers, labels)}/>
    }
  };

  return (
    <div className='chartContainer'>
      {renderChart()}
    </div>
  )
}

export default Draw;
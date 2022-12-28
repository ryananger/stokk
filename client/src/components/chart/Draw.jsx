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

    data.map(function(entry, i) {
      let date  = entry.date;
      let month = Number(date.slice(5, 7));
      let day   = Number(date.slice(8));

      labels.push([day, helpers.toMonthName(month)]);
    })

    return labels;
  }();

  const prepData = function(type) {
    const prepped = [];

    labels.map(function(label, i) {
      if (type === 'bar') {
        prepped.push([data[i].open, data[i].close]);
      } else {
        prepped.push(data[i].open);
      }
    })

    return prepped;
  };

  const barData = {
    labels,
    datasets: [
      {
        data: prepData('bar')
      }
    ]
  };

  const lineData = {
    labels,
    datasets: [
      {
        data: prepData('line')
      }
    ]
  };

  var renderChart = function() {
    if (data.length > 45) {
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
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
import optionsImport from './options.js';

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

var options = optionsImport;
var min, max;
const Draw = function({data}) {
  if (data.length === 0) {
    return;
  }

  const labels = function() {
    let labels = [];
    let onMonth = null;

    data.map(function(entry, i) {
      var date  = new Date(entry.date);
      var month = date.getMonth() + 1;
      var day   = date.getDate() + 1;

      labels.push(`${month}/${day}`);
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
        data: prepData('line'),
        type: 'line'
      }
    ]
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
import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const Draw = function({data}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(134 100 145)'
        },
        border: {
          display: false
        },
        grid: {
          display: false,
          color: 'rgb(95, 67, 104)'
        }
      },
      y: {
        position: 'right',
        ticks: {
          color: 'rgb(134 100 145)'
        },
        border: {
          display: false
        },
        grid: {
          color: 'rgb(95, 67, 104)'
        }
      }
    }
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map((label, i) => [i*5 + 3 + (Math.floor(Math.random() * 3)), i*5 + 1]),
        backgroundColor: 'rgb(134 100 145)'
      }
    ]
  };

  return (
    <div className='chartContainer'>
      <Bar options={options} data={data2} />
    </div>
  )
}

export default Draw;
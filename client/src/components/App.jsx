import React from 'react';
import {useState, useEffect} from 'react';
import ax from '../ax.js';
import helpers from '../helpers.js';
import '../style.css';

import Interface from './Interface.jsx';
import Visual from './Visual.jsx';
import Head from './Head.jsx';

const dateString = helpers.dateString;
const labels     = helpers.labels;
const startDate  = helpers.startDate;

const App = function() {
  const [data, setData] = useState([]);
  const [marketDate, setDate] = useState(startDate);
  const [running, toggle] = useState(false);

  var renderLabels = function() {
    var rendered = [];

    labels.map(function(label) {
      rendered.push((
        <div key={label} className='tableKey'>{label}</div>
      ))
    })

    return (
      <div>
        <div className='keys h'>
          {rendered}
        </div>
        <hr/>
      </div>
    )
  };

  var renderData = function() {
    if (data.length === 0) {
      return;
    }

    var rendered = [];

    data.map(function(entry, i) {
      rendered.push((
        <div key={i} className='entry h'>
          <div className='entryKey'>{entry.ticker}</div>
          <div className='entryKey'>{entry.date}</div>
          <div className='entryKey'>{helpers.trunc(entry.open)}</div>
          <div className='entryKey'>{helpers.trunc(entry.close)}</div>
          <div className='entryKey'>{helpers.trunc(entry.high)}</div>
          <div className='entryKey'>{helpers.trunc(entry.low)}</div>
          <div className='entryKey'>{Math.floor(entry.volume)}</div>
          <div className='entryKey'>{helpers.trunc(entry.vwap)}</div>
        </div>
      ));
    })

    return rendered;
  }

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle);
    }
  }, [marketDate, running]);

  return (
    <div id='app'>
      <Head toggle={toggle} running={running}/>
      <div className='interface h'>
        <Interface setData={setData}/>
        <Visual data={data}/>
      </div>
      <div id='dataRender'>
        {renderLabels()}
        {renderData()}
      </div>
    </div>
  )
}

export default App;
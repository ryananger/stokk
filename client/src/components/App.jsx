import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ax from '../ax.js';
import helpers from '../helpers.js';
import styles from '../style.css';

const dateString = helpers.getDateFromCookie();

const startDate = {
  year:  dateString.slice(0, 4),
  month: dateString.slice(5, 7),
  day:   dateString.slice(8)
};

console.log('Last date checked: ', startDate);

const App = function() {
  const [data, setData] = useState([]);
  const [marketDate, setDate] = useState(startDate);
  const [running, toggle] = useState(false);

  var runButton = function() {
    toggle(!running);
  };

  var runStop = function() {
    return running ? 'Stop Updating' : 'Run Update';
  };

  var handleSubmit = function(e) {
    e.preventDefault();
    var keys = ['ticker', 'date', 'open', 'close', 'high', 'low', 'volume', 'vwap'];

    var form = e.target;
    var filter = {};

    keys.map(function(key) {
      if (!form[key].value) {
        return;
      } else {
        var val = form[key].value;

        if (key === 'ticker') {
          val = val.toUpperCase();
        }

        filter[key] = val;
      }
    })

    console.log(filter)
    ax.getTickers(filter, setData);
  };

  useEffect(function() {
    if (running) {
      ax.polygonDataLoop(marketDate, setDate, toggle);
    }
  }, [marketDate, running]);

  return (
    <div id='app'>
      <div className='head h'>
        <h1>stokk</h1>
        <button onClick={runButton}>{runStop()}</button>
      </div>
      <form id='searchForm' onSubmit={handleSubmit}>
        <label>
          Ticker:
          <input type='text' id='ticker'/>
        </label>
        <label>
          Open:
          <input type='text' id='open'/>
        </label>
        <label>
          Close:
          <input type='text' id='close'/>
        </label>
        <label>
          High:
          <input type='text' id='high'/>
        </label>
        <label>
          Low:
          <input type='text' id='low'/>
        </label>
        <label>
          Volume:
          <input type='text' id='volume'/>
        </label>
        <label>
          VWAP:
          <input type='text' id='vwap'/>
        </label>
        <label>
          Date:
          <input type='date' id='date'/>
        </label>
        <input type='submit' value='Search'/>
      </form>

      <br/>
      <br/>
      {JSON.stringify(data)}
    </div>
  )
}

export default App;